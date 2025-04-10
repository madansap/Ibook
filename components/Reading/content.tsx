import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  ScrollView, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  Dimensions, 
  SafeAreaView, 
  StatusBar, 
  Platform,
  GestureResponderEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  findNodeHandle,
  UIManager,
  LayoutChangeEvent,
  EmitterSubscription,
  TextInput,
  NativeModules,
  ActionSheetIOS,
  Keyboard,
  Clipboard
} from 'react-native';
import { Gear, X, ChatCircleDots, Lightning, Highlighter, BookmarkSimple, Copy } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import ChatSheet from '../Chat/ChatSheet';
import HighlightedText from './HighlightedText';
import TextSelectionMenu from './TextSelectionMenu';

// Define the selection change event data interface
interface SelectionChangeEventData {
  selection: {
    start: number;
    end: number;
  };
}

const { width, height } = Dimensions.get('window');

interface Selection {
  text: string;
  start: number;
  end: number;
  paragraphIndex: number;
}

interface Highlight {
  text: string;
  start: number;
  end: number;
  paragraphIndex: number;
}

// Access the UIMenuController on iOS to suppress the native menu
const UIMenuController = Platform.OS === 'ios' ? NativeModules.UIMenuController : null;

const Content = () => {
  const [isToolbarVisible, setToolbarVisible] = useState(false);
  const [isChatSheetVisible, setChatSheetVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState<number | null>(null);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [selectionMenuPosition, setSelectionMenuPosition] = useState({ x: 0, y: 0 });
  const [showSelectionMenu, setShowSelectionMenu] = useState(false);
  
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartTime = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const paragraphRefs = useRef<Array<View | null>>([]);
  const textSelectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textInputRefs = useRef<Array<TextInput | null>>([]);
  const selectionMenuRef = useRef<View | null>(null);
  const selectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Content paragraphs
  const paragraphs = [
    "Progress that is both rapid enough to be noticed and stable enough to continue over many generations has been achieved only once in the history of our species.",
    "It began at approximately the time of the scientific revolution, and is still under way. It has included improve ments not only in scientific understanding, but also in technology, political institutions, moral values, art, and every aspect of human welfare. Whenever there has been progress, there have been influential thinkers who denied that it was genuine, that it was desirable, or even that the concept was meaningful.",
    "They should have known better. There is indeed an objective difference between a false explanation and a true one, between chronic failure to solve a problem and solving it, and also between wrong and right, ugly and beautiful, suffering and its alleviation – and thus between stagnation and progress in the fullest sense. There is indeed an objective difference between chronic failure to solve a problem and solving it.",
    "The scientific revolution was part of a wider intellectual revolution, the Enlightenment, which also brought progress in other fields, especially moral and political philosophy, and in the institutions of society. Unfortunately, the Enlightenment is still misunderstood, especially by philosophers.",
    "The Enlightenment worldview is not a revision of common sense. It rejects traditional foundations of knowledge such as authority and dogma. It is a worldview of reach, not of limits. It is about error-correction, not perfect knowledge.",
    "The Enlightenment was a rebellion against authority in regard to knowledge. It was about people thinking for themselves rather than deferring to authority, tradition, revelation, or the pronouncements of sages.",
    "The Enlightenment was not just about the creation of knowledge, but about a way of pursuing it: by trying to understand the world through explanatory theories that can be criticized.",
    "The Enlightenment was not primarily about science. It was about a certain approach to science, and to all knowledge: critical questioning, holding knowledge and institutions permanently open to improvement.",
    "The Enlightenment was not about the discovery of rationality. It was about the realization that progress comes from the critical examination of ideas.",
    "The Enlightenment was not about the replacement of tradition by reason. It was about the realization that traditions are changeable, and that they can be improved by criticism.",
    "The Enlightenment was not about the replacement of faith by reason. It was about the realization that all knowledge is conjectural, and that authority is not a source of knowledge.",
    "The Enlightenment was not about the replacement of religion by science. It was about the realization that the growth of knowledge depends on the critical examination of all ideas, including religious ones.",
    "The Enlightenment was not about the replacement of values by facts. It was about the realization that values are linked to facts about human flourishing, and that they can be improved by critical examination.",
    "The Enlightenment was not about the replacement of the humanities by science. It was about the realization that all knowledge grows by conjecture and criticism, including knowledge in the humanities.",
    "The Enlightenment was not about the replacement of the subjective by the objective. It was about the realization that objective knowledge is created by people, and that it can be improved by criticism."
  ];

  // Hide toolbar after 3 seconds of inactivity
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isToolbarVisible && !isScrolling && !isTextSelected) {
      timer = setTimeout(() => {
        setToolbarVisible(false);
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isToolbarVisible, isScrolling, isTextSelected]);

  // Add a listener to hide the native menu when selection is made
  useEffect(() => {
    if (isTextSelected) {
      hideNativeMenuOnIOS();
    }
  }, [isTextSelected]);

  // Add a timeout to hide the copy success message
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (showCopySuccess) {
      timer = setTimeout(() => {
        setShowCopySuccess(false);
      }, 2000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showCopySuccess]);

  // Add a function to hide the native menu on iOS
  const hideNativeMenuOnIOS = () => {
    if (Platform.OS === 'ios' && UIMenuController && UIMenuController.hideMenu) {
      UIMenuController.hideMenu();
    }
  };

  const handleTouchStart = (e: GestureResponderEvent) => {
    touchStartTime.current = Date.now();
    touchStartY.current = e.nativeEvent.pageY;
  };

  const handleTouchEnd = (e: GestureResponderEvent) => {
    const touchDuration = Date.now() - touchStartTime.current;
    const touchDistance = Math.abs(e.nativeEvent.pageY - touchStartY.current);
    
    // If it's a long press, don't toggle toolbar
    if (isLongPress) {
      setIsLongPress(false);
      return;
    }
    
    // If it's a tap (short duration, minimal movement) and not scrolling
    if (touchDuration < 300 && touchDistance < 10 && !isScrolling) {
      toggleToolbar();
    }
  };

  // Calculate the position of the selection menu
  const calculateSelectionMenuPosition = (
    paragraphIndex: number, 
    selectionStart: number, 
    selectionEnd: number
  ) => {
    if (paragraphRefs.current[paragraphIndex]) {
      UIManager.measure(
        findNodeHandle(paragraphRefs.current[paragraphIndex]) as number,
        (x, y, width, height, pageX, pageY) => {
          const paragraph = paragraphs[paragraphIndex];
          
          // Calculate the approximate position of the selection within the paragraph
          const selectionMidpoint = (selectionStart + selectionEnd) / 2;
          
          // Calculate the line height (approximate)
          const lineHeight = 24; // This should match your text line height
          
          // Calculate the approximate line number of the selection
          const charsPerLine = Math.floor(width / 8); // Approximate chars per line based on width (assuming ~8px per char)
          const approximateLineNumber = Math.floor(selectionMidpoint / charsPerLine);
          
          // Calculate the y position based on the line number
          const selectionY = pageY + (approximateLineNumber * lineHeight);
          
          // Just pass the x and y coordinates to the TextSelectionMenu component
          // which will handle the positioning details
          const menuPosition = {
            x: pageX + width / 2, // Center horizontally on the paragraph
            y: selectionY // Position at the selection
          };
          
          setSelectionMenuPosition(menuPosition);
        }
      );
    }
  };

  // Track selection changes
  const handleSelectionChange = (event: NativeSyntheticEvent<SelectionChangeEventData>, paragraphIndex: number) => {
    const { selection: sel } = event.nativeEvent;
    
    // Only process if there's an actual selection (start != end)
    if (sel && sel.start !== sel.end) {
      const paragraph = paragraphs[paragraphIndex];
      const selectedText = paragraph.substring(sel.start, sel.end);
      
      // Update selection state
      setSelection({
        text: selectedText,
        start: sel.start,
        end: sel.end,
        paragraphIndex
      });
      
      // Set text as selected
      setIsTextSelected(true);
      
      // Calculate the position for the selection menu
      calculateSelectionMenuPosition(paragraphIndex, sel.start, sel.end);
      
      // Clear any existing timeout
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current);
      }
      
      // Platform-specific behavior for showing the menu
      if (Platform.OS === 'ios') {
        // On iOS, we need to wait a bit to let the native selection UI appear
        // then hide it and show our custom menu
        selectionTimeoutRef.current = setTimeout(() => {
          hideNativeMenuOnIOS();
          setShowSelectionMenu(true);
        }, 300);
      } else {
        // On Android, we can show our menu a bit faster
        selectionTimeoutRef.current = setTimeout(() => {
          setShowSelectionMenu(true);
        }, 200);
      }
    } else if (sel && sel.start === sel.end && isTextSelected) {
      // User tapped somewhere else, clear the selection
      // But only if our menu isn't showing yet (to prevent accidental dismissal)
      if (!showSelectionMenu || (event.nativeEvent as any).eventCount > 1) {
        clearSelection();
      }
    }
  };

  const handleExplain = () => {
    if (selection) {
      console.log('Explain:', selection.text);
      // Here you would implement the explanation functionality
    }
    clearSelection();
  };

  const handleHighlight = () => {
    if (selection) {
      // Add the selection to highlights
      setHighlights([...highlights, { ...selection }]);
    }
    clearSelection();
  };

  const handleSave = () => {
    if (selection) {
      console.log('Save:', selection.text);
      // Here you would implement the save functionality
    }
    clearSelection();
  };

  const handleCopy = () => {
    if (selection) {
      // Copy the selected text to clipboard
      Clipboard.setString(selection.text);
      setShowCopySuccess(true);
    }
    clearSelection();
  };

  const clearSelection = () => {
    setIsTextSelected(false);
    setShowSelectionMenu(false);
    setSelection(null);
    
    // Clear any pending selection timeout
    if (selectionTimeoutRef.current) {
      clearTimeout(selectionTimeoutRef.current);
      selectionTimeoutRef.current = null;
    }
    
    // For all paragraphs, try to clear selection
    textInputRefs.current.forEach(textInput => {
      if (textInput) {
        // Make non-editable again
        textInput.setNativeProps({ 
          editable: false,
          contextMenuHidden: true
        });
        
        textInput.blur();
        
        // On iOS, we need to clear the selection programmatically
        if (Platform.OS === 'ios') {
          textInput.setNativeProps({
            selection: { start: 0, end: 0 }
          });
        }
      }
    });
    
    // For Android, we can try to dismiss the keyboard to clear selection
    if (Platform.OS === 'android') {
      Keyboard.dismiss();
    }
  };

  const toggleToolbar = () => {
    if (!isScrolling && !isChatSheetVisible) {
      setToolbarVisible(!isToolbarVisible);
    }
  };

  const toggleChatSheet = () => {
    setChatSheetVisible(!isChatSheetVisible);
    // Hide toolbar when chat is opened
    if (!isChatSheetVisible) {
      setToolbarVisible(false);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // If we detect any scroll movement, mark as scrolling
    if (!isScrolling) {
      setIsScrolling(true);
      setToolbarVisible(false);
    }
    
    // Reset the timeout on each scroll event
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set a timeout to mark scrolling as ended after a delay
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 500);
    
    // Clear text selection when scrolling
    if (isTextSelected) {
      clearSelection();
    }
  };

  // Find if a paragraph has highlights
  const getHighlightsForParagraph = (paragraphIndex: number) => {
    return highlights.filter(h => h.paragraphIndex === paragraphIndex);
  };

  // Use a TouchableOpacity wrapper instead of onLongPress directly on TextInput
  const handleParagraphPress = (paragraphIndex: number) => {
    // Toggle toolbar on normal press
    if (!isLongPress) {
      toggleToolbar();
    }
  };

  const handleParagraphLongPress = (paragraphIndex: number) => {
    setIsLongPress(true);
    setSelectedParagraphIndex(paragraphIndex);
    
    // Focus the TextInput to show the selection handles
    if (textInputRefs.current[paragraphIndex]) {
      const textInput = textInputRefs.current[paragraphIndex];
      if (textInput) {
        // Make the TextInput editable to allow selection
        textInput.setNativeProps({ 
          editable: true,
          contextMenuHidden: false // Allow native selection UI to appear
        });
        textInput.focus();
        
        // Platform-specific behavior
        if (Platform.OS === 'android') {
          // On Android, we need to keep the TextInput editable longer
          // to allow the selection handles to work properly
          setTimeout(() => {
            if (textInput) {
              // Keep editable but hide context menu
              textInput.setNativeProps({
                contextMenuHidden: true
              });
            }
          }, 500);
        }
      }
    }
  };

  // Handle when user taps outside of a selection to dismiss the menu
  const handleDismissSelection = () => {
    if (isTextSelected) {
      clearSelection();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissSelection}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        <View style={styles.contentContainer}>
          {/* Top Toolbar */}
          {isToolbarVisible && !isTextSelected && (
            <SafeAreaView style={styles.topToolbar}>
              <View style={styles.topToolbarContent}>
                <TouchableOpacity style={styles.iconButton}>
                  <Gear size={22} color="#333" />
                </TouchableOpacity>
                
                <Text style={styles.toolbarTitle}>The Beginning of Infinity</Text>
                
                <TouchableOpacity style={styles.iconButton} onPress={handleBackPress}>
                  <X size={22} color="#333" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          )}
          
          {/* Selection Menu */}
          {isTextSelected && showSelectionMenu && (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 900 }}>
              <TextSelectionMenu
                position={selectionMenuPosition}
                onExplain={handleExplain}
                onHighlight={handleHighlight}
                onSave={handleSave}
                onDismiss={clearSelection}
                selectedText={selection?.text}
              />
            </View>
          )}
          
          {/* Copy Success Message */}
          {showCopySuccess && (
            <View style={styles.copySuccessContainer}>
              <Text style={styles.copySuccessText}>Copied to clipboard</Text>
            </View>
          )}
          
          <ScrollView 
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={handleScroll}
            onTouchStart={(e) => {
              // Prevent default behavior that might trigger native menu
              if (Platform.OS === 'ios') {
                e.stopPropagation();
              }
              handleTouchStart(e);
            }}
            onTouchEnd={handleTouchEnd}
            onScrollBeginDrag={() => setIsScrolling(true)}
          >
            {paragraphs.map((paragraph, index) => {
              const paragraphHighlights = getHighlightsForParagraph(index);
              
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  onPress={() => handleParagraphPress(index)}
                  onLongPress={() => handleParagraphLongPress(index)}
                  delayLongPress={500}
                >
                  <View 
                    ref={ref => paragraphRefs.current[index] = ref}
                  >
                    {paragraphHighlights.length > 0 ? (
                      // If there are highlights for this paragraph
                      <HighlightedText
                        key={`highlight-${index}`}
                        text={paragraph}
                        highlightStart={paragraphHighlights[0].start}
                        highlightEnd={paragraphHighlights[0].end}
                        style={styles.content}
                        selectable={true}
                      />
                    ) : (
                      // No highlights for this paragraph
                      <TextInput
                        ref={ref => textInputRefs.current[index] = ref}
                        style={[styles.content, styles.textInput]}
                        value={paragraph}
                        multiline={true}
                        scrollEnabled={false}
                        editable={false}
                        contextMenuHidden={true}
                        selectionColor="#FF9500" // Solid orange color for better visibility
                        onSelectionChange={(e) => handleSelectionChange(e, index)}
                        // Disable the native menu on Android
                        textBreakStrategy="simple"
                        // Disable the native menu on iOS
                        dataDetectorTypes="none"
                        // Prevent copy/paste menu
                        onTouchStart={(e) => {
                          // Prevent default behavior that might trigger native menu
                          if (Platform.OS === 'ios') {
                            e.stopPropagation();
                          }
                          handleTouchStart(e);
                        }}
                        // Add these props for better selection experience
                        selectTextOnFocus={false}
                        keyboardType="default"
                        autoCorrect={false}
                        spellCheck={false}
                        // Disable auto capitalization
                        autoCapitalize="none"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          
          {/* Bottom Chat Button */}
          {isToolbarVisible && !isChatSheetVisible && !isTextSelected && (
            <View style={styles.chatButtonContainer}>
              <TouchableOpacity 
                style={styles.chatButton} 
                onPress={(e) => {
                  e.stopPropagation();
                  toggleChatSheet();
                }}
              >
                <ChatCircleDots size={24} color="#FFF" weight="fill" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        {/* Chat Sheet */}
        {isChatSheetVisible && <ChatSheet onClose={toggleChatSheet} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  topToolbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 10,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 8,
    paddingBottom: 8,
  },
  topToolbarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbarTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  iconButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 90 : 60, // Add padding at the top to ensure content isn't hidden by toolbar
    paddingBottom: 80, // Add padding at the bottom to ensure content isn't hidden by toolbar
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    marginBottom: 16,
  },
  textInput: {
    padding: 0,
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
  },
  chatButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
  chatButton: {
    backgroundColor: '#FF9500',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 90,
  },
  copySuccessContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  copySuccessText: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
  },
});

export default Content;
