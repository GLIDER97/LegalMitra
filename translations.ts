export type Language = 'en' | 'hi';

const commonTranslations = {
    tagline: {
        en: 'Legal Clarity. Instantly.',
        hi: 'कानूनी स्पष्टता। तुरंत।',
    },
    footer_copyright: {
        en: 'LegalIQ.app. All rights reserved.',
        hi: 'LegalIQ.app। सर्वाधिकार सुरक्षित।',
    },
    footer_disclaimer_title: {
        en: 'Disclaimer',
        hi: 'अस्वीकरण',
    },
    footer_disclaimer_text: {
        en: 'This tool is AI-powered and does not provide legal advice. The analysis is for informational purposes only.',
        hi: 'यह टूल AI-संचालित है और कानूनी सलाह नहीं देता है। विश्लेषण केवल सूचनात्मक उद्देश्यों के लिए है।',
    },
    // Loader
    loader_parsing: {
        en: 'Processing File...',
        hi: 'फ़ाइल संसाधित हो रही है...',
    },
    loader_analyzing: {
        en: 'Analyzing Document...',
        hi: 'दस्तावेज़ का विश्लेषण हो रहा है...',
    },
    loader_step_1: {
        en: "Summarizing key points in simple language...",
        hi: "मुख्य बिंदुओं को सरल भाषा में सारांशित किया जा रहा है...",
    },
    loader_step_2: {
        en: "Conducting a full SWOT analysis...",
        hi: "पूर्ण SWOT विश्लेषण किया जा रहा है...",
    },
    loader_step_3: {
        en: "Identifying potential red flags...",
        hi: "संभावित रेड फ्लैग की पहचान की जा रही है...",
    },
    loader_step_4: {
        en: "Thinking about possible negotiation points...",
        hi: "संभावित बातचीत के बिंदुओं के बारे में सोचा जा रहा है...",
    },
    loader_step_5: {
        en: "Creating a glossary of confusing jargon...",
        hi: "भ्रामक शब्दजाल की शब्दावली बनाई जा रही है...",
    },
    loader_step_jargon: {
        en: "Simplifying Technical Words...",
        hi: "तकनीकी शब्दों को सरल बनाया जा रहा है...",
    },
    // Errors
    error_file_parse_title: {
        en: "File Reading Error",
        hi: "फ़ाइल पढ़ने में त्रुटि",
    },
    error_file_parse_message: {
        en: "We had trouble reading your file. Please ensure it's a valid, uncorrupted PDF, Word, or text document and try uploading it again.",
        hi: "हमें आपकी फ़ाइल पढ़ने में समस्या हुई। कृपया सुनिश्चित करें कि यह एक वैध, गैर-भ्रष्ट PDF, Word, या टेक्स्ट दस्तावेज़ है और इसे फिर से अपलोड करने का प्रयास करें।",
    },
    error_empty_document_title: {
        en: "Empty Document",
        hi: "खाली दस्तावेज़",
    },
    error_empty_document_message: {
        en: "There's nothing to analyze. Please upload a file or paste text into the box to get started.",
        hi: "विश्लेषण करने के लिए कुछ भी नहीं है। कृपया शुरू करने के लिए एक फ़ाइल अपलोड करें या बॉक्स में टेक्स्ट पेस्ट करें।",
    },
    error_analysis_title: {
        en: "Analysis Failed",
        hi: "विश्लेषण विफल",
    },
    error_analysis_message: {
        en: "The AI was unable to process the document. This can sometimes happen due to high traffic or an unusual document structure. Please try again in a moment.",
        hi: "AI दस्तावेज़ को संसाधित करने में असमर्थ था। यह कभी-kadang उच्च ट्रैफ़िक या एक असामान्य दस्तावेज़ संरचना के कारण हो सकता है। कृपया थोड़ी देर में पुनः प्रयास करें।",
    },
    error_ocr_title: {
        en: "OCR Error",
        hi: "ओसीआर त्रुटि",
    },
    error_ocr_message: {
        en: "The OCR library could not be loaded to read the scanned document. Please check your internet connection and try again.",
        hi: "स्कैन किए गए दस्तावेज़ को पढ़ने के लिए ओसीआर लाइब्रेरी लोड नहीं हो सकी। कृपया अपना इंटरनेट कनेक्शन जांचें और फिर से प्रयास करें।",
    },
    error_pdf_hindi_title: {
        en: "Hindi PDF Generation Failed",
        hi: "हिंदी पीडीएफ बनाने में विफलता",
    },
    error_pdf_hindi_message: {
        en: "We're sorry, but there was an issue generating the PDF in Hindi. This is often due to font compatibility issues. Please try downloading in English or contact support.",
        hi: "हमें खेद है, लेकिन हिंदी में पीडीएफ बनाने में कोई समस्या हुई। यह अक्सर फ़ॉन्ट संगतता समस्याओं के कारण होता है। कृपया अंग्रेजी में डाउनलोड करने का प्रयास करें या सहायता से संपर्क करें।",
    },
    error_pdf_generic_title: {
        en: "PDF Generation Failed",
        hi: "पीडीएफ बनाने में विफलता",
    },
    error_pdf_generic_message: {
        en: "We encountered an unexpected error while creating your PDF report. Please try again in a moment.",
        hi: "आपकी पीडीएफ रिपोर्ट बनाते समय हमें एक अप्रत्याशित त्रुटि का सामना करना पड़ा। कृपया थोड़ी देर में पुनः प्रयास करें।",
    },
    // Report
    report_title: {
        en: 'Your Document Safety Report',
        hi: 'आपकी दस्तावेज़ सुरक्षा रिपोर्ट',
    },
     report_subtitle: {
        en: "Here's what your trusted Mitra found to protect you.",
        hi: "यहाँ वह है जो आपके भरोसेमंद मित्र ने आपकी सुरक्षा के लिए पाया।",
    },
    report_download_button: {
        en: 'Download PDF Report',
        hi: 'पीडीएफ रिपोर्ट डाउनलोड करें',
    },
    report_summary_title: {
        en: 'In Simple Words, This Document Is About...',
        hi: 'सरल शब्दों में, यह दस्तावेज़ इसके बारे में है...',
    },
    report_complexity_title: {
        en: 'Complexity & Risk Score',
        hi: 'जटिलता और जोखिम स्कोर',
    },
    report_complexity_desc: {
        en: 'How much legal expertise is needed to safely navigate this document.',
        hi: 'इस दस्तावेज़ को सुरक्षित रूप से नेविगेट करने के लिए कितनी कानूनी विशेषज्ञता की आवश्यकता है।',
    },
    report_swot_title: {
        en: 'Your Strategic Analysis: The Good, The Bad, and The Dangers',
        hi: 'आपका रणनीतिक विश्लेषण: अच्छा, बुरा और खतरे',
    },
    swot_strengths: {
        en: 'Your Advantages (Strengths)',
        hi: 'आपके फायदे (ताकत)',
    },
    swot_weaknesses: {
        en: 'Potential Gaps (Weaknesses)',
        hi: 'संभावित कमियां (कमजोरियाँ)',
    },
    swot_opportunities: {
        en: 'Areas to Improve (Opportunities)',
        hi: 'सुधार के क्षेत्र (अवसर)',
    },
    swot_threats: {
        en: 'Critical Dangers (Threats)',
        hi: 'गंभीर खतरे (खतरे)',
    },
    report_redflags_title: {
        en: 'Critical Red Flags: Address These Immediately',
        hi: 'गंभीर रेड फ्लैग्स: इन पर तुरंत ध्यान दें',
    },
    report_negotiate_title: {
        en: 'Actionable Points to Negotiate for Your Protection',
        hi: 'आपकी सुरक्षा के लिए बातचीत करने योग्य बिंदु',
    },
    report_none_identified: {
        en: 'None identified.',
        hi: 'कोई नहीं मिला।',
    },
    report_none_identified_negotiate: {
        en: 'No specific negotiation points were identified.',
        hi: 'बातचीत के लिए कोई विशिष्ट बिंदु नहीं पहचाने गए।',
    },
    report_example_prefix: {
        en: 'Example:',
        hi: 'उदाहरण:',
    },
    // PDF
    pdf_analysis_by: {
        en: 'Analysis by LegalIQ.app',
        hi: 'LegalIQ.app द्वारा विश्लेषण',
    },
    pdf_generated_on: { en: 'Generated on', hi: 'पर बनाया गया'},
    pdf_summary_title: { en: 'Executive Summary', hi: 'कार्यकारी सारांश'},
    pdf_page: { en: 'Page', hi: 'पृष्ठ'},
    pdf_of: { en: 'of', hi: 'का'},
    pdf_footer_disclaimer: { en: 'Disclaimer: This is an AI-generated analysis and does not constitute legal advice.', hi: 'अस्वीकरण: यह AI-जनित विश्लेषण है और यह कानूनी सलाह का गठन नहीं करता है।'},
    pdf_footer_cta_prefix: {
        en: 'For Free Contract Analysis Use ',
        hi: 'मुफ्त अनुबंध विश्लेषण के लिए उपयोग करें ',
    },
    pdf_footer_cta_link: {
        en: 'LegalIQ.app',
        hi: 'LegalIQ.app',
    },
    pdf_for_document: {
        en: 'For',
        hi: 'के लिए',
    },
    pdf_glossary_title: {
        en: 'Glossary of Terms',
        hi: 'शब्दावली',
    },
    pdf_glossary_term_header: {
        en: 'Term',
        hi: 'शब्द',
    },
    pdf_glossary_def_header: {
        en: 'Definition',
        hi: 'परिभाषा',
    },
    pdf_chat_history_title: {
        en: 'Follow-up Q&A',
        hi: 'अनुवर्ती प्रश्नोत्तर',
    },
    pdf_chat_user_prefix: {
        en: 'You:',
        hi: 'आप:',
    },
    pdf_chat_model_prefix: {
        en: 'LegalIQ:',
        hi: 'लीगलआईक्यू:',
    },
};

const emotionalCopy = {
    hero_title: {
        en: "FREE AI CONTRACT CHECKER",
        hi: "मुफ़्त एआई अनुबंध चेकर",
    },
    hero_subheadline_new: {
        en: "Analyze Your Contracts & Chat for Clarity",
        hi: "स्पष्टता के लिए अपने अनुबंधों का विश्लेषण करें और चैट करें",
    },
    hero_subtitle: {
        en: "From health insurance to job or rental contracts, the fine print can hide life-changing risks. LegalIQ.app simplifies complex documents into clear insights, so you can sign with confidence.",
        hi: "स्वास्थ्य बीमा से लेकर नौकरी या किराये के अनुबंध तक, छोटे अक्षरों में जीवन बदलने वाले जोखिम छिपे हो सकते हैं।LegalIQ.app जटिल दस्तावेजों को स्पष्ट अंतर्दृष्टि में सरल बनाता है, ताकि आप आत्मविश्वास से हस्ताक्षर कर सकें।",
    },
    upload_cta: {
        en: "Secure Your Future. Analyze Your Document Now.",
        hi: "अपना भविष्य सुरक्षित करें। अपने दस्तावेज़ का अभी विश्लेषण करें।",
    },
    upload_supported_files: {
        en: "We accept PDF, Word, and text files.",
        hi: "हम PDF, Word और टेक्स्ट फ़ाइलें स्वीकार करते हैं।",
    },
    upload_or_paste: {
        en: "or simply paste the text",
        hi: "या बस टेक्स्ट पेस्ट करें",
    },
    upload_placeholder: {
        en: "You can copy and paste the text from your document right here. We promise to keep it safe and private.",
        hi: "आप अपने दस्तावेज़ से टेक्स्ट को सीधे यहां कॉपी और पेस्ट कर सकते हैं। हम इसे सुरक्षित और निजी रखने का वादा करते हैं।",
    },
    upload_characters: {
        en: "characters",
        hi: "अक्षर",
    },
    upload_file: {
        en: "File",
        hi: "फ़ाइल",
    },
    upload_analyze_button: {
        en: "Protect Me & Analyze Now",
        hi: "मेरी रक्षा करें और अभी विश्लेषण करें",
    },
    upload_analysis_done_button: {
        en: "Analysis Generated Below",
        hi: "विश्लेषण नीचे उत्पन्न किया गया है",
    },
    why_title: {
        en: "Your Shield Against Legal Traps & Fine Print",
        hi: "कानूनी जाल और बारीक अक्षरों के खिलाफ आपकी ढाल",
    },
    why_subtitle: {
        en: "In a world of complex contracts, you need more than a tool—you need a guardian. We built LegalIQ.app to be your first line of defense against costly mistakes, hidden clauses, and life-altering oversights.",
        hi: "जटिल अनुबंधों की दुनिया में, आपको एक उपकरण से कहीं अधिक की आवश्यकता है - आपको एक अभिभावक की आवश्यकता है। हमने लीगलआईक्यू.ऐप को महंगी गलतियों, छिपे हुए क्लॉज और जीवन बदलने वाली चूकों के खिलाफ आपकी रक्षा की पहली पंक्ति के रूप में बनाया है।",
    },
    why_feature_1_title: {
        en: "Clarity in Your Language",
        hi: "आपकी भाषा में स्पष्टता",
    },
    why_feature_1_desc: {
        en: "We cut through the dense legal jargon, translating it into plain language you can actually understand. Know exactly what you're agreeing to in English, Hindi, Spanish, Arabic, and Chinese.",
        hi: "हम घने कानूनी शब्दजाल को काटते हैं, इसे सादी भाषा में अनुवाद करते हैं जिसे आप वास्तव में समझ सकते हैं। जानें कि आप हिंदी, अंग्रेजी, स्पेनिश, अरबी और चीनी में वास्तव में किस बात पर सहमत हो रहे हैं।",
    },
    why_feature_2_title: {
        en: "Your Secrets are Safe",
        hi: "आपके रहस्य सुरक्षित हैं",
    },
    why_feature_2_desc: {
        en: "Your privacy is sacred. We use bank-level security to process your documents, and they are permanently deleted after analysis. We never see them, we never store them. Period.",
        hi: "आपकी गोपनीयता पवित्र है। हम आपके दस्तावेज़ों को संसाधित करने के लिए बैंक-स्तरीय सुरक्षा का उपयोग करते हैं, और विश्लेषण के बाद उन्हें स्थायी रूप से हटा दिया जाता है। हम उन्हें कभी नहीं देखते, हम उन्हें कभी संग्रहीत नहीं करते। बस।",
    },
    why_feature_3_title: {
        en: "Instant Peace of Mind",
        hi: "तुरंत मन की शांति",
    },
    why_feature_3_desc: {
        en: "Why wait in anxiety for days? Get a comprehensive analysis in seconds. Your critical safeguard is available 24/7, right when you need it most.",
        hi: "दिनों तक चिंता में क्यों प्रतीक्षा करें? सेकंडों में एक व्यापक विश्लेषण प्राप्त करें। आपका महत्वपूर्ण सुरक्षा कवच 24/7 उपलब्ध है, ठीक उसी समय जब आपको इसकी सबसे अधिक आवश्यकता होती है।",
    },
     why_feature_4_title: {
        en: "Actionable Intelligence",
        hi: "कार्रवाई योग्य बुद्धिमत्ता",
    },
    why_feature_4_desc: {
        en: "We don't just find problems; we give you the ammunition to fight back. Our report highlights specific points to negotiate, empowering you to demand fairer terms and protect your interests.",
        hi: "हम केवल समस्याएं नहीं ढूंढते; हम आपको वापस लड़ने के लिए गोला-बारूद देते हैं। हमारी रिपोर्ट बातचीत करने के लिए विशिष्ट बिंदुओं पर प्रकाश डालती है, जो आपको उचित शर्तों की मांग करने और अपने हितों की रक्षा करने के लिए सशक्त बनाती है।",
    },
    mission_vision_title: {
        en: "Our Promise to You",
        hi: "हमारा आपसे वादा",
    },
    mission_title: {
        en: "Our Mission",
        hi: "हमारा मिशन",
    },
    mission_text: {
        en: "To stand as a friend ('Mitra') against the intimidating complexity of law. Our mission is to shatter the walls of legal jargon, empowering every person with the clarity to understand and the confidence to challenge. We are dedicated to making legal understanding not a privilege for the few, but an essential right for all.",
        hi: "कानून की डरावनी जटिलता के खिलाफ एक दोस्त ('मित्र') के रूप में खड़ा होना। हमारा मिशन कानूनी शब्दजाल की दीवारों को तोड़ना है, हर व्यक्ति को समझने की स्पष्टता और चुनौती देने के आत्मविश्वास के साथ सशक्त बनाना है। हम कानूनी समझ को कुछ लोगों के लिए विशेषाधिकार नहीं, बल्कि सभी के लिए एक आवश्यक अधिकार बनाने के लिए समर्पित हैं।",
    },
    vision_title: {
        en: "Our Vision",
        hi: "हमारी दृष्टि",
    },
    vision_text: {
        en: "We envision a future where no one signs a document in fear or ignorance. A world where financial security and personal well-being are protected because legal clarity is instant, accessible, and in a language everyone understands. We are building a future where every person is empowered to make informed, safe decisions, creating a society built on fairness and justice for all.",
        hi: "हम एक ऐसे भविष्य की कल्पना करते हैं जहां कोई भी डर या अज्ञानता में किसी दस्तावेज़ पर हस्ताक्षर न करे। एक ऐसी दुनिया जहां वित्तीय सुरक्षा और व्यक्तिगत भलाई सुरक्षित है क्योंकि कानूनी स्पष्टता तत्काल, सुलभ और हर किसी की समझ में आने वाली भाषा में है। हम एक ऐसे भविष्य का निर्माण कर रहे हैं जहां हर व्यक्ति को सूचित, सुरक्षित निर्णय लेने के लिए सशक्त किया जाता है, जिससे सभी के लिए निष्पक्षता और न्याय पर आधारित समाज का निर्माण होता है।",
    },
    mission_vision_cta: {
        en: "Start Your Analysis",
        hi: "अपना विश्लेषण शुरू करें",
    },
    feedback_button_tooltip: {
        en: "Provide Feedback",
        hi: "प्रतिक्रिया दें",
    },
    analyze_to_chat_tooltip: {
        en: "Please analyze a document first to enable chat.",
        hi: "चैट सक्षम करने के लिए कृपया पहले एक दस्तावेज़ का विश्लेषण करें।",
    },
    analyze_to_talk_tooltip: {
        en: "Please analyze a document first to enable voice chat.",
        hi: "वॉइस चैट सक्षम करने के लिए कृपया पहले एक दस्तावेज़ का विश्लेषण करें।",
    },
};

const trustSection = {
    trust_title: {
        en: "Built on a Foundation of Trust & Security",
        hi: "विश्वास और सुरक्षा की नींव पर निर्मित",
    },
    trust_subtitle: {
        en: "Your most sensitive documents deserve the highest level of protection. Here's our unwavering commitment to you.",
        hi: "आपके सबसे संवेदनशील दस्तावेजों को उच्चतम स्तर की सुरक्षा मिलनी चाहिए। यहाँ आपके प्रति हमारी अटूट प्रतिबद्धता है।",
    },
    trust_feature_1_title: {
        en: "Ironclad Privacy",
        hi: "अभेद्य गोपनीयता",
    },
    trust_feature_1_desc: {
        en: "Your documents are yours alone. They are processed with bank-level security and are permanently deleted after analysis. We never see them, we never store them. Period.",
        hi: "आपके दस्तावेज़ केवल आपके हैं। उन्हें बैंक-स्तरीय सुरक्षा के साथ संसाधित किया जाता है और विश्लेषण के बाद स्थायी रूप से हटा दिया जाता है। हम उन्हें कभी नहीं देखते, हम उन्हें कभी संग्रहीत नहीं करते। बस।",
    },
    trust_feature_2_title: {
        en: "Powered by LegalIQ AI™",
        hi: "LegalIQ AI™ द्वारा संचालित",
    },
    trust_feature_2_desc: {
        en: "Our analysis is driven by our proprietary LegalIQ AI™ engine, trained on millions of legal documents to recognize risks, traps, and opportunities that others might miss. It's world-class intelligence protecting you.",
        hi: "हमारा विश्लेषण हमारे स्वामित्व वाले LegalIQ AI™ इंजन द्वारा संचालित है, जिसे लाखों कानूनी दस्तावेजों पर प्रशिक्षित किया गया है ताकि उन जोखिमों, जालों और अवसरों को पहचाना जा सके जिन्हें अन्य लोग चूक सकते हैं। यह विश्व स्तरीय बुद्धिमत्ता आपकी सुरक्षा कर रही है।",
    },
    trust_feature_3_title: {
        en: "Objective & Unbiased",
        hi: "उद्देश्य और निष्पक्ष",
    },
    trust_feature_3_desc: {
        en: "Get a completely neutral, fact-based analysis. Our AI has one mission: to protect your interests. It gives you a clear, unbiased perspective, free from external influence or agenda.",
        hi: "एक पूरी तरह से तटस्थ, तथ्य-आधारित विश्लेषण प्राप्त करें। हमारे एआई का एक ही मिशन है: आपके हितों की रक्षा करना। यह आपको बाहरी प्रभाव या एजेंडे से मुक्त, एक स्पष्ट, निष्पक्ष परिप्रेक्ष्य देता है।",
    }
};

const testimonialsSection = {
    testimonials_title: {
        en: "Don't Just Take Our Word For It",
        hi: "केवल हमारे शब्दों पर विश्वास न करें",
    },
    testimonials_subtitle: {
        en: "Hear from users who turned confusion into confidence and avoided financial and personal disaster with LegalIQ.app.",
        hi: "उन उपयोगकर्ताओं से सुनें जिन्होंने लीगलआईक्यू.ऐप के साथ भ्रम को आत्मविश्वास में बदल दिया और वित्तीय और व्यक्तिगत आपदा से बचे।",
    },
    testimonial_1_quote: {
        en: "My rental agreement seemed standard, but LegalIQ.app flagged a maintenance clause that would have made me liable for thousands in repairs. It literally saved me from a potential nightmare landlord situation!",
        hi: "मेरा किराये का समझौता मानक लग रहा था, लेकिन लीगलआईक्यू.ऐप ने एक रखरखाव क्लॉज को हरी झंडी दिखाई, जो मुझे हजारों की मरम्मत के लिए उत्तरदायी बना देता। इसने मुझे सचमुच एक संभावित दुःस्वप्न मकान मालिक की स्थिति से बचाया!",
    },
    testimonial_1_name: {
        en: "Priya S.",
        hi: "प्रिया एस.",
    },
    testimonial_1_role: {
        en: "Software Engineer",
        hi: "सॉफ्टवेयर इंजीनियर",
    },
    testimonial_2_quote: {
        en: "As a small business owner, I can't afford legal surprises. This tool is my first line of defense. It spots risks in vendor contracts I'd never see, giving me the power to negotiate from a position of strength. It's like having a 24/7 lawyer on my team.",
        hi: "एक छोटे व्यवसाय के मालिक के रूप में, मैं कानूनी आश्चर्य का जोखिम नहीं उठा सकता। यह उपकरण मेरी रक्षा की पहली पंक्ति है। यह विक्रेता अनुबंधों में उन जोखिमों को पकड़ता है जिन्हें मैं कभी नहीं देख पाता, मुझे एक मजबूत स्थिति से बातचीत करने की शक्ति देता है। यह मेरी टीम में 24/7 वकील होने जैसा है।",
    },
    testimonial_2_name: {
        en: "David L.",
        hi: "डेविड एल.",
    },
    testimonial_2_role: {
        en: "Small Business Owner",
        hi: "छोटे व्यवसाय के मालिक",
    },
    testimonial_3_quote: {
        en: "I was seconds from signing a freelance contract that would have given away the rights to my creative work. LegalIQ.app's clear explanation of a tricky IP clause was a wake-up call. I renegotiated and protected my future.",
        hi: "मैं एक फ्रीलांस अनुबंध पर हस्ताक्षर करने से कुछ ही सेकंड दूर था, जो मेरे रचनात्मक काम के अधिकार छीन लेता। एक मुश्किल आईपी क्लॉज के बारे में लीगलआईक्यू.ऐप के स्पष्ट स्पष्टीकरण ने मुझे जगा दिया। मैंने फिर से बातचीत की और अपने भविष्य की रक्षा की।",
    },
    testimonial_3_name: {
        en: "Sophia M.",
        hi: "सोफिया एम.",
    },
    testimonial_3_role: {
        en: "Freelance Designer",
        hi: "फ्रीलांस डिजाइनर",
    },
    testimonial_4_quote: {
        en: "The non-compete in my first job offer was so restrictive it could have hobbled my career before it even started. LegalIQ.app helped me understand the danger, and I went back to HR with the confidence to ask for a fairer agreement.",
        hi: "मेरी पहली नौकरी की पेशकश में गैर-प्रतिस्पर्धा खंड इतना प्रतिबंधात्मक था कि यह मेरे करियर को शुरू होने से पहले ही पंगु बना सकता था। लीगलआईक्यू.ऐप ने मुझे खतरे को समझने में मदद की, और मैं एक उचित समझौते के लिए पूछने के आत्मविश्वास के साथ एचआर के पास वापस गया।",
    },
    testimonial_4_name: {
        en: "Aarav C.",
        hi: "आरव सी.",
    },
    testimonial_4_role: {
        en: "University Student",
        hi: "विश्वविद्यालय का छात्र",
    },
    testimonial_5_quote: {
        en: "Buying our first home was terrifying, and the sale agreement was unreadable. This tool exposed a hidden penalty clause for a delayed closing that could have cost us our deposit. It's an absolutely essential check for any major life decision.",
        hi: "अपना पहला घर खरीदना भयानक था, और बिक्री समझौता अपठनीय था। इस उपकरण ने देरी से समापन के लिए एक छिपे हुए दंड खंड का खुलासा किया, जो हमारी जमा राशि खर्च कर सकता था। यह किसी भी बड़े जीवन निर्णय के लिए एक नितांत आवश्यक जांच है।",
    },
    testimonial_5_name: {
        en: "Emily & John P.",
        hi: "एमिली और जॉन पी.",
    },
    testimonial_5_role: {
        en: "First-time Homebuyers",
        hi: "पहली बार घर खरीदने वाले",
    },
    testimonial_6_quote: {
        en: "As an artist, my livelihood depends on licensing my work correctly. I almost agreed to a deal with a royalty rate far below industry standard. LegalIQ.app's analysis gave me the data I needed to negotiate a much better, fairer deal. It's empowering for creators.",
        hi: "एक कलाकार के रूप में, मेरी आजीविका मेरे काम को सही ढंग से लाइसेंस देने पर निर्भर करती है। मैंने लगभग एक ऐसे सौदे के लिए सहमति दे दी थी जिसमें रॉयalty दर उद्योग मानक से बहुत कम थी। लीगलआईक्यू.ऐप के विश्लेषण ने मुझे एक बेहतर, निष्पक्ष सौदे के लिए बातचीत करने के लिए आवश्यक डेटा दिया। यह रचनाकारों के लिए सशक्त है।",
    },
    testimonial_6_name: {
        en: "Chloe B.",
        hi: "क्लो बी.",
    },
    testimonial_6_role: {
        en: "Digital Artist",
        hi: "डिजिटल कलाकार",
    },
    testimonial_7_quote: {
        en: "I'm a recent law graduate, and even I find some contracts confusing. I used LegalIQ.app to double-check an employment offer. It flagged an ambiguous bonus structure I had missed. An invaluable tool before any deep-dive.",
        hi: "मैं हाल ही में कानून से स्नातक हुआ हूं, और मुझे भी कुछ अनुबंध भ्रामक लगते हैं। मैंने नौकरी की पेशकश की दोबारा जांच के लिए लीगलआईक्यू.ऐप का इस्तेमाल किया। इसने एक अस्पष्ट बोनस संरचना को हरी झंडी दिखाई जिसे मैंने अनदेखा कर दिया था। किसी भी गहन जांच से पहले एक अमूल्य उपकरण।",
    },
    testimonial_7_name: {
        en: "Vikram R.",
        hi: "विक्रम आर.",
    },
    testimonial_7_role: {
        en: "Law Graduate",
        hi: "कानून स्नातक",
    },
    testimonial_8_quote: {
        en: "Running a small NGO means we can't afford expensive legal fees for every grant agreement. LegalIQ.app exposed a clause that gave funders undue control over our operations. It's an invaluable resource for the social sector.",
        hi: "एक छोटी एनजीओ चलाने का मतलब है कि हम हर अनुदान समझौते के लिए महंगी कानूनी फीस वहन नहीं कर सकते। लीगलआईक्यू.ऐप ने एक क्लॉज का खुलासा किया जो फंडर्स को हमारे संचालन पर अनुचित नियंत्रण देता था। यह सामाजिक क्षेत्र के लिए एक अमूल्य संसाधन है।",
    },
    testimonial_8_name: {
        en: "Fatima K.",
        hi: "फातिमा के.",
    },
    testimonial_8_role: {
        en: "NGO Manager",
        hi: "एनजीओ प्रबंधक",
    },
    testimonial_9_quote: {
        en: "My insurance claim was rejected with a letter full of jargon. I pasted it into LegalIQ.app, and it clearly explained they were using a loophole in my policy. That information was crucial for my successful appeal. I'm so grateful!",
        hi: "मेरा बीमा दावा शब्दजाल से भरे एक पत्र के साथ खारिज कर दिया गया था। मैंने इसे लीगलआईक्यू.ऐप में पेस्ट किया, और इसने स्पष्ट रूप से समझाया कि वे मेरी पॉलिसी में एक खामी का उपयोग कर रहे थे। वह जानकारी मेरी सफल अपील के लिए महत्वपूर्ण थी। मैं बहुत आभारी हूं!",
    },
    testimonial_9_name: {
        en: "Gurpreet S.",
        hi: "गुरप्रीत एस.",
    },
    testimonial_9_role: {
        en: "High School Teacher",
        hi: "हाई स्कूल शिक्षक",
    },
};

const useCasesSection = {
    use_cases_title: {
        en: "One Document Away from Disaster",
        hi: "एक दस्तावेज़, तबाही से एक कदम दूर",
    },
    use_cases_subtitle: {
        en: "These aren't just scenarios; they are real-world risks people face every day. See how LegalIQ.app acts as a crucial safeguard to prevent life-altering mistakes.",
        hi: "ये केवल परिदृश्य नहीं हैं; ये वास्तविक दुनिया के जोखिम हैं जिनका लोग हर दिन सामना करते हैं। देखें कि कैसे लीगलआईक्यू.ऐप जीवन बदलने वाली गलतियों को रोकने के लिए एक महत्वपूर्ण सुरक्षा कवच के रूप में कार्य करता है।",
    },
    use_cases_1_title: { en: "Renters & Tenants", hi: "किराएदार और किरायेदार" },
    use_cases_1_desc: { 
        en: "Maria's new lease had a clause making her responsible for all appliance repairs. LegalIQ.app flagged this costly trap, allowing her to negotiate it out and avoid potentially thousands in unexpected costs.",
        hi: "मारिया के नए पट्टे में एक क्लॉज था जो उसे सभी उपकरणों की मरम्मत के लिए जिम्मेदार बनाता था। लीगलआईक्यू.ऐप ने इस महंगे जाल को हरी झंडी दिखाई, जिससे वह इस पर बातचीत कर सकी और हजारों की अप्रत्याशोषित लागत से बच सकी।",
    },
    use_cases_2_title: { en: "Employees", hi: "कर्मचारी" },
    use_cases_2_desc: { 
        en: "Alex's first job offer included a non-compete clause so restrictive it would have blocked him from working in his industry for two years. Our analysis exposed the danger, leading to a revised agreement that protected his future career.",
        hi: "एलेक्स की पहली नौकरी की पेशकश में एक गैर-प्रतिस्पर्धा खंड शामिल था जो इतना प्रतिबंधात्मक था कि यह उसे दो साल तक अपने उद्योग में काम करने से रोक देता। हमारे विश्लेषण ने खतरे का खुलासा किया, जिससे एक संशोधित समझौता हुआ जिसने उसके भविष्य के करियर की रक्षा की।",
    },
    use_cases_3_title: { en: "Freelancers", hi: "फ्रीलांसर" },
    use_cases_3_desc: { 
        en: "A client's contract for Lena, a freelance designer, had vague payment terms with no due dates. LegalIQ.app identified this as a major red flag for non-payment, prompting her to secure a clear 30-day payment cycle and protect her income.",
        hi: "एक फ्रीलांस डिजाइनर लीना के लिए एक ग्राहक के अनुबंध में बिना किसी नियत तारीख के अस्पष्ट भुगतान शर्तें थीं। लीगलआईक्यू.ऐप ने इसे गैर-भुगतान के लिए एक बड़े रेड फ्लैग के रूप में पहचाना, जिससे उसने एक स्पष्ट 30-दिवसीय भुगतान चक्र सुरक्षित किया और अपनी आय की रक्षा की।",
    },
    use_cases_4_title: { en: "Small Business Owners", hi: "छोटे व्यवसाय के मालिक" },
    use_cases_4_desc: { 
        en: "Sam, a coffee shop owner, nearly signed a supplier agreement with an auto-renewal clause that hiked prices by 30% annually. Our tool caught it, allowing him to renegotiate and save his business from crippling costs.",
        hi: "सैम, एक कॉफी शॉप के मालिक, ने लगभग एक आपूर्तिकर्ता समझौते पर हस्ताक्षर कर दिए थे जिसमें एक ऑटो-नवीनीकरण क्लॉज था जो कीमतों में सालाना 30% की वृद्धि करता था। हमारे उपकरण ने इसे पकड़ लिया, जिससे वह फिर से बातचीत कर सका और अपने व्यवसाय को पंगु बनाने वाली लागतों से बचा सका।",
    },
    use_cases_5_title: { en: "Homebuyers", hi: "घर खरीदार" },
    use_cases_5_desc: { 
        en: "First-time homebuyers, the Patels, were unaware of a penalty clause for a delayed closing that could have cost them their entire deposit. LegalIQ.app flagged it, empowering them to arrange finances and avoid a devastating loss.",
        hi: "पहली बार घर खरीदने वाले, पटेल, देरी से समापन के लिए एक दंड खंड से अनजान थे, जो उन्हें उनकी पूरी जमा राशि खर्च कर सकता था। लीगलआईक्यू.ऐप ने इसे हरी झंडी दिखाई, उन्हें वित्त की व्यवस्था करने और एक विनाशकारी नुकसान से बचने के लिए सशक्त बनाया।",
    },
    use_cases_6_title: { en: "Students", hi: "छात्र" },
    use_cases_6_desc: { 
        en: "An internship offer for student Jamal included a clause giving the company ownership of all his personal projects during the term. LegalIQ.app's summary clarified this overreach, helping him secure rights to his own work.",
        hi: "छात्र जमाल के लिए एक इंटर्नशिप प्रस्ताव में एक क्लॉज शामिल था जो कंपनी को अवधि के दौरान उसकी सभी व्यक्तिगत परियोजनाओं का स्वामित्व देता था। लीगलआईक्यू.ऐप के सारांश ने इस अतिरेक को स्पष्ट किया, जिससे उसे अपने काम के अधिकार सुरक्षित करने में मदद मिली।",
    },
    use_cases_7_title: { en: "Creators & Artists", hi: "रचनाकार और कलाकार" },
    use_cases_7_desc: { 
        en: "Artist Chloe was offered a licensing deal with a complex royalty structure that was far below industry standard. She used LegalIQ.app to understand the trap and successfully negotiated a fair deal, protecting her livelihood.",
        hi: "कलाकार क्लो को एक जटिल रॉयल्टी संरचना के साथ एक लाइसेंसिंग सौदे की पेशकश की गई थी जो उद्योग मानक से बहुत कम थी। उसने जाल को समझने के लिए लीगलआईक्यू.ऐप का इस्तेमाल किया और सफलतापूर्वक एक उचित सौदे पर बातचीत की, जिससे उसकी आजीविका की रक्षा हुई।",
    },
    use_cases_8_title: { en: "Online Users", hi: "ऑनलाइन उपयोगकर्ता" },
    use_cases_8_desc: { 
        en: "Before joining a new social platform, David checked its Terms of Service. He was alerted that the platform claimed perpetual rights to use his content for marketing, a critical detail that helped him protect his privacy.",
        hi: "एक नए सोशल प्लेटफॉर्म में शामिल होने से पहले, डेविड ने इसकी सेवा की शर्तों की जाँच की। उसे सतर्क किया गया कि प्लेटफॉर्म ने विपणन के लिए उसकी सामग्री का उपयोग करने के स्थायी अधिकारों का दावा किया है, एक महत्वपूर्ण विवरण जिसने उसे अपनी गोपनीयता की रक्षा करने में मदद की।",
    },
    use_cases_9_title: { en: "Entrepreneurs", hi: "उद्यमियों" },
    use_cases_9_desc: { 
        en: "Startup founder Aisha received a one-sided NDA from an investor with an unusually long confidentiality period. LegalIQ.app identified this as a risk to her business, helping her propose a reasonable timeframe that protected her intellectual property.",
        hi: "स्टार्टअप संस्थापक आयशा को एक निवेशक से एक असामान्य रूप से लंबी गोपनीयता अवधि के साथ एकतरफा एनडीए प्राप्त हुआ। लीगलआईक्यू.ऐप ने इसे उसके व्यवसाय के लिए एक जोखिम के रूप में पहचाना, जिससे उसे एक उचित समय-सीमा का प्रस्ताव करने में मदद मिली जिसने उसकी बौद्धिक संपदा की रक्षा की।",
    },
    use_cases_10_title: { en: "Insurance Claimants", hi: "बीमा दावेदार" },
    use_cases_10_desc: { 
        en: "After a car accident, Ben's insurance settlement offer waived his right to claim future medical expenses. Our analysis helped him understand this critical waiver, prompting him to consult a lawyer before signing away his rights.",
        hi: "एक कार दुर्घटना के बाद, बेन के बीमा निपटान प्रस्ताव ने भविष्य के चिकित्सा खर्चों का दावा करने के उसके अधिकार को माफ कर दिया। हमारे विश्लेषण ने उसे इस महत्वपूर्ण छूट को समझने में मदद की, जिससे उसने अपने अधिकारों को छोड़ने से पहले एक वकील से सलाह ली।",
    },
};

const faqSection = {
    faq_title: {
        en: "Frequently Asked Questions",
        hi: "अक्सर पूछे जाने वाले प्रश्न",
    },
    faq_subtitle: {
        en: "Have questions? We have answers. Here are some of the most common things people ask.",
        hi: "प्रश्न हैं? हमारे पास उत्तर हैं। यहाँ कुछ सबसे आम चीजें हैं जो लोग पूछते हैं।",
    },
    faq_q1: { en: "What is LegalIQ.app?", hi: "LegalIQ.app क्या है?" },
    faq_a1: {
        en: "LegalIQ.app is your essential AI-powered safeguard for understanding complex legal documents. It acts as a friend ('Mitra') to expose legal jargon, provide simple summaries, identify life-altering risks, and suggest points for negotiation before you sign.",
        hi: "लीगलआईक्यू.ऐप जटिल कानूनी दस्तावेजों को समझने के लिए आपका आवश्यक एआई-संचालित सुरक्षा कवच है। यह कानूनी शब्दजाल को उजागर करने, सरल सारांश प्रदान करने, जीवन बदलने वाले जोखिमों की पहचान करने और हस्ताक्षर करने से पहले बातचीत के लिए बिंदु सुझाने के लिए एक दोस्त ('मित्र') के रूप में कार्य करता है।",
    },
    faq_q2: { en: "How does your contract analysis AI work?", hi: "आपका अनुबंध विश्लेषण एआई कैसे काम करता है?" },
    faq_a2: {
        en: "Our contract analysis AI is powered by our state-of-the-art LegalIQ AI™ engine. When you upload or paste a document, the AI performs a deep artificial intelligence contract analysis, breaking down the text into key components like strengths, weaknesses, red flags, and negotiation points, presenting them in an easy-to-understand report.",
        hi: "हमारा अनुबंध विश्लेषण एआई हमारे अत्याधुनिक LegalIQ AI™ इंजन द्वारा संचालित है। जब आप कोई दस्तावेज़ अपलोड या पेस्ट करते हैं, तो एआई एक गहरा कृत्रिम बुद्धिमत्ता अनुबंध विश्लेषण करता है, पाठ को ताकत, कमजोरियों, रेड फ्लैग और बातचीत के बिंदुओं जैसे प्रमुख घटकों में तोड़ता है, और उन्हें समझने में आसान रिपोर्ट में प्रस्तुत करता है।",
    },
    faq_q3: { en: "Is this a free contract review software?", hi: "क्या यह एक मुफ्त अनुबंध समीक्षा सॉफ्टवेयर है?" },
    faq_a3: {
        en: "Yes, LegalIQ.app is currently offered as a free contract review software. Our mission is to make legal clarity accessible to everyone, and we believe cost should not be a barrier to protecting yourself and understanding your rights.",
        hi: "हाँ, लीगलआईक्यू.ऐप वर्तमान में एक मुफ्त अनुबंध समीक्षा सॉफ्टवेयर के रूप में पेश किया जाता है। हमारा मिशन कानूनी स्पष्टता को सभी के लिए सुलभ बनाना है, और हमारा मानना है कि लागत खुद को बचाने और अपने अधिकारों को समझने में बाधा नहीं बननी चाहिए।",
    },
    faq_q4: { en: "What makes LegalIQ.app the best AI contract review software?", hi: "लीगलआईक्यू.ऐप को सबसे अच्छा एआई अनुबंध समीक्षा सॉफ्टवेयर क्या बनाता है?" },
    faq_a4: {
        en: "While 'best' is subjective, we strive to be the most essential AI contract review software by focusing on user safety and empowerment. We provide not just technical analysis but also clarity and confidence. Our tool offers multi-language support and focuses on actionable advice to protect you, which sets our contract review software AI apart.",
        hi: "हालांकि 'सबसे अच्छा' व्यक्तिपरक है, हम उपयोगकर्ता सुरक्षा और सशक्तिकरण पर ध्यान केंद्रित करके सबसे आवश्यक एआई अनुबंध समीक्षा सॉफ्टवेयर बनने का प्रयास करते हैं। हम केवल तकनीकी विश्लेषण ही नहीं, बल्कि स्पष्टता और आत्मविश्वास भी प्रदान करते हैं। हमारा उपकरण बहु-भाषा समर्थन प्रदान करता है और आपकी सुरक्षा के लिए कार्रवाई योग्य सलाह पर ध्यान केंद्रित करता है, जो हमारे अनुबंध समीक्षा सॉफ्टवेयर एआई को अलग करता है।",
    },
    faq_q5: { en: "What types of documents can I analyze with this tool?", hi: "मैं इस उपकरण के साथ किस प्रकार के दस्तावेजों का विश्लेषण कर सकता हूं?" },
    faq_a5: {
        en: "You can use LegalIQ.app for a wide range of documents. It's an effective legal contract review software for rental agreements, employment contracts, insurance policies, terms of service, and vendor contracts. Essentially, any text-based legal document can be analyzed.",
        hi: "आप लीगलआईक्यू.ऐप का उपयोग कई प्रकार के दस्तावेजों के लिए कर सकते हैं। यह किराये के समझौतों, रोजगार अनुबंधों, बीमा पॉलिसियों, सेवा की शर्तों और विक्रेता अनुबंधों के लिए एक प्रभावी कानूनी अनुबंध समीक्षा सॉफ्टवेयर है। अनिवार्य रूप से, किसी भी पाठ-आधारित कानूनी दस्तावेज़ का विश्लेषण किया जा सकता है।",
    },
    faq_q6: { en: "How secure is my data with your contract review automation software?", hi: "आपके अनुबंध समीक्षा स्वचालन सॉफ्टवेयर के साथ मेरा डेटा कितना सुरक्षित है?" },
    faq_a6: {
        en: "Your privacy is our top priority. Our contract review automation software processes your document securely with bank-level encryption and does not store it on our servers after the analysis is complete. The entire process is designed to be private and for your eyes only.",
        hi: "आपकी गोपनीयता हमारी सर्वोच्च प्राथमिकता है। हमारा अनुबंध समीक्षा स्वचालन सॉफ्टवेयर आपके दस्तावेज़ को बैंक-स्तरीय एन्क्रिप्शन के साथ सुरक्षित रूप से संसाधित करता है और विश्लेषण पूरा होने के बाद इसे हमारे सर्वर पर संग्रहीत नहीं करता है। पूरी प्रक्रिया को निजी और केवल आपकी आँखों के लिए डिज़ाइन किया गया है।",
    },
    faq_q7: { en: "How is this different from other automated contract review software?", hi: "यह अन्य स्वचालित अनुबंध समीक्षा सॉफ्टवेयर से कैसे अलग है?" },
    faq_a7: {
        en: "Many automated contract review software solutions are built for legal professionals. LegalIQ.app is designed specifically for you, the individual. We prioritize simple language, identifying real-world risks, and providing actionable advice for your protection, making legal safety accessible to everyone.",
        hi: "कई स्वचालित अनुबंध समीक्षा सॉफ्टवेयर समाधान कानूनी पेशेवरों के लिए बनाए गए हैं। लीगलआईक्यू.ऐप विशेष रूप से आपके, यानी व्यक्ति के लिए डिज़ाइन किया गया है। हम सरल भाषा, वास्तविक दुनिया के जोखिमों की पहचान करने और आपकी सुरक्षा के लिए कार्रवाई योग्य सलाह प्रदान करने को प्राथमिकता देते हैं, जिससे कानूनी सुरक्षा सभी के लिए सुलभ हो जाती है।",
    },
    faq_q8: { en: "Can LegalIQ.app replace a lawyer?", hi: "क्या LegalIQ.app एक वकील की जगह ले सकता है?" },
    faq_a8: {
        en: "Absolutely not. LegalIQ.app is a powerful informational tool to help you spot risks, but it does not provide legal advice and is not a substitute for a qualified lawyer. Think of it as an essential first step. Our goal is to arm you with knowledge so you can avoid common traps and be a more informed, prepared client if you do need to consult a legal professional.",
        hi: "बिलकुल नहीं। लीगलआईक्यू.ऐप जोखिमों को पहचानने में आपकी मदद करने के लिए एक शक्तिशाली सूचनात्मक उपकरण है, लेकिन यह कानूनी सलाह प्रदान नहीं करता है और एक योग्य वकील का विकल्प नहीं है। इसे एक आवश्यक पहला कदम समझें। हमारा लक्ष्य आपको ज्ञान से लैस करना है ताकि आप आम जालों से बच सकें और यदि आपको किसी कानूनी पेशेवर से परामर्श करने की आवश्यकता हो तो एक अधिक सूचित, तैयार ग्राहक बन सकें।",
    },
    faq_q9: { en: "What are the main benefits of using AI contract review tools?", hi: "एआई अनुबंध समीक्षा उपकरणों का उपयोग करने के मुख्य लाभ क्या हैं?" },
    faq_a9: {
        en: "The main benefits are speed, affordability, and immediate risk detection. You get an initial safety analysis in seconds, which can help you quickly identify potential issues and understand the core dangers of a document without needing to spend hours or a fortune to do so.",
        hi: "मुख्य लाभ गति, सामर्थ्य और तत्काल जोखिम का पता लगाना है। आपको सेकंडों में एक प्रारंभिक सुरक्षा विश्लेषण मिलता है, जो आपको संभावित मुद्दों की शीघ्रता से पहचान करने और किसी दस्तावेज़ के मुख्य खतरों को समझने में मदद कर सकता है, बिना ऐसा करने के लिए घंटों या भाग्य खर्च किए।",
    },
    faq_q10: { en: "What file formats does your contract review software support?", hi: "आपका अनुबंध समीक्षा सॉफ्टवेयर किन फ़ाइल स्वरूपों का समर्थन करता है?" },
    faq_a10: {
        en: "Our contract review software supports PDF, Microsoft Word (.docx), and plain text (.txt, .rtf) files. You can also simply copy and paste the text directly into the text area for analysis.",
        hi: "हमारा अनुबंध समीक्षा सॉफ्टवेयर PDF, Microsoft Word (.docx), और सादे पाठ (.txt, .rtf) फ़ाइलों का समर्थन करता है। आप विश्लेषण के लिए सीधे पाठ क्षेत्र में पाठ को कॉपी और पेस्ट भी कर सकते हैं।",
    },
};

const languagePromptSection = {
    language_prompt_title: {
        en: "Switch to {languageName}?",
        hi: "{languageName} में स्विच करें?",
    },
    language_prompt_message: {
        en: "It looks like you prefer {languageName}. Would you like to switch the language of the app?",
        hi: "ऐसा लगता है कि आप {languageName} पसंद करते हैं। क्या आप ऐप की भाषा बदलना चाहेंगे?",
    },
    language_prompt_no_thanks: {
        en: "No, Thanks",
        hi: "नहीं, धन्यवाद",
    },
    language_prompt_translate: {
        en: "Translate to {languageName}",
        hi: "{languageName} में अनुवाद करें",
    },
};

const blogContentSection = {
    blog_main_title_p1: {
        en: "LegalIQ.app: The Ultimate Free ",
        hi: "LegalIQ.app: सर्वोत्तम मुफ़्त ",
    },
    blog_main_title_k1: {
        en: "AI Contract Review Software",
        hi: "एआई अनुबंध समीक्षा सॉफ्टवेयर",
    },
    blog_p1: {
        en: "In today's fast-paced world, navigating the complexities of legal documents can feel daunting. Whether you're signing a health insurance policy or entering a rental agreement, understanding the fine print is crucial. That's where LegalIQ.app, the best <k>AI contract review software</k>, comes into play. This <k>free contract review software</k> simplifies the process, allowing you to focus on what truly matters—making informed decisions.",
        hi: "आज की तेज़-तर्रार दुनिया में, कानूनी दस्तावेज़ों की जटिलताओं से निपटना मुश्किल हो सकता है। चाहे आप स्वास्थ्य बीमा पॉलिसी पर हस्ताक्षर कर रहे हों या किराये के समझौते में प्रवेश कर रहे हों, बारीक अक्षरों को समझना महत्वपूर्ण है। यहीं पर लीगलआईक्यू.ऐप, सबसे अच्छा <k>एआई अनुबंध समीक्षा सॉफ्टवेयर</k>, काम आता है। यह <k>मुफ़्त अनुबंध समीक्षा सॉफ्टवेयर</k> प्रक्रिया को सरल बनाता है, जिससे आप उस पर ध्यान केंद्रित कर सकते हैं जो वास्तव में मायने रखता है - सूचित निर्णय लेना।",
    },
    blog_h2_1: {
        en: "Why Legal Document Analysis Matters More Than Ever",
        hi: "कानूनी दस्तावेज़ विश्लेषण पहले से कहीं ज़्यादा मायने क्यों रखता है",
    },
    blog_p2: {
        en: "Legal documents surround us daily, from employment contracts to rental agreements, insurance policies to terms of service agreements. Yet, most people struggle to decipher the complex language and hidden implications within these documents. Traditional contract review automation software was primarily designed for law firms, leaving everyday consumers without accessible tools to understand their legal commitments.",
        hi: "कानूनी दस्तावेज़ हमें रोज़ाना घेरते हैं, रोजगार अनुबंध से लेकर किराये के समझौते तक, बीमा पॉलिसियों से लेकर सेवा की शर्तों के समझौतों तक। फिर भी, अधिकांश लोग इन दस्तावेज़ों के भीतर की जटिल भाषा और छिपे हुए निहितार्थों को समझने के लिए संघर्ष करते हैं। पारंपरिक अनुबंध समीक्षा स्वचालन सॉफ्टवेयर मुख्य रूप से कानून फर्मों के लिए डिज़ाइन किया गया था, जिससे रोज़मर्रा के उपभोक्ताओं को अपने कानूनी दायित्वों को समझने के लिए सुलभ उपकरणों के बिना छोड़ दिया गया था।",
    },
    blog_p3: {
        en: "This gap in the market has created a significant problem: individuals regularly sign documents without fully understanding their rights, obligations, and potential risks. The consequences can be costly, ranging from unexpected fees to unfavorable terms that could impact your financial future.",
        hi: "बाजार में इस अंतर ने एक महत्वपूर्ण समस्या पैदा कर दी है: व्यक्ति नियमित रूप से अपने अधिकारों, दायित्वों और संभावित जोखिमों को पूरी तरह से समझे बिना दस्तावेजों पर हस्ताक्षर करते हैं। परिणाम महंगे हो सकते हैं, अप्रत्याशित शुल्क से लेकर प्रतिकूल शर्तों तक जो आपके वित्तीय भविष्य को प्रभावित कर सकते हैं।",
    },
    blog_h2_2: {
        en: "Introducing LegalIQ.app: Your Personal Legal Document Assistant",
        hi: "पेश है LegalIQ.app: आपका व्यक्तिगत कानूनी दस्तावेज़ सहायक",
    },
    blog_p4: {
        en: "LegalIQ.app emerges as a game-changing <k>document review tool</k> that democratizes legal document analysis. Unlike expensive contract management software review platforms designed exclusively for legal professionals, LegalIQ.app serves as a free legal document checker accessible to everyone, regardless of their legal background.",
        hi: "लीगलआईक्यू.ऐप एक गेम-चेंजिंग <k>दस्तावेज़ समीक्षा उपकरण</k> के रूप में उभरता है जो कानूनी दस्तावेज़ विश्लेषण को लोकतांत्रिक बनाता है। कानूनी पेशेवरों के लिए विशेष रूप से डिज़ाइन किए गए महंगे अनुबंध प्रबंधन सॉफ़्टवेयर समीक्षा प्लेटफ़ॉर्म के विपरीत, लीगलआईक्यू.ऐप एक मुफ़्त कानूनी दस्तावेज़ चेकर के रूप में कार्य करता है जो सभी के लिए सुलभ है, चाहे उनकी कानूनी पृष्ठभूमि कुछ भी हो।",
    },
    blog_p5: {
        en: "This innovative artificial intelligence contract analysis platform transforms complex legal jargon into clear, understandable insights. Whether you're a small business owner, a job seeker, or simply someone who wants to understand their insurance policy better, LegalIQ.app provides the clarity you need to make informed decisions.",
        hi: "यह अभिनव कृत्रिम बुद्धिमत्ता अनुबंध विश्लेषण मंच जटिल कानूनी शब्दजाल को स्पष्ट, समझने योग्य अंतर्दृष्टि में बदल देता है। चाहे आप एक छोटे व्यवसाय के मालिक हों, नौकरी खोजने वाले हों, या बस कोई ऐसा व्यक्ति जो अपनी बीमा पॉलिसी को बेहतर ढंग से समझना चाहता हो, लीगलआईक्यू.ऐप आपको सूचित निर्णय लेने के लिए आवश्यक स्पष्टता प्रदान करता है।",
    },
    blog_cta_button: {
        en: "Start Your Free Analysis Now",
        hi: "अब अपना निःशुल्क विश्लेषण शुरू करें",
    },
    blog_h2_3: {
        en: "Comprehensive Features That Set LegalIQ.app Apart",
        hi: "व्यापक सुविधाएँ जो LegalIQ.app को अलग करती हैं",
    },
    // Vani Mitra new keys
    vani_mitra_button_label: {
        en: "Talk to Vani Mitra",
        hi: "वानी मित्रा से बात करें",
    },
    vani_mitra_welcome: {
        en: "Hello, I am Vani Mitra. Ask me anything about your document.",
        hi: "नमस्ते, मैं वानी मित्रा हूँ। अपने दस्तावेज़ के बारे में मुझसे कुछ भी पूछें।",
    },
    vani_mitra_listening: {
        en: "Listening...",
        hi: "सुन रही हूँ...",
    },
    vani_mitra_thinking: {
        en: "Thinking...",
        hi: "सोच रही हूँ...",
    },
    vani_mitra_speaking: {
        en: "Speaking...",
        hi: "बोल रही हूँ...",
    },
    vani_mitra_error: {
        en: "An error occurred.",
        hi: "एक त्रुटि हुई।",
    },
    vani_mitra_mic_error_denied: {
        en: "Microphone access was denied. Please allow microphone access in your browser settings to use this feature.",
        hi: "माइक्रोफ़ोन एक्सेस अस्वीकार कर दिया गया था। इस सुविधा का उपयोग करने के लिए कृपया अपने ब्राउज़र सेटिंग्स में माइक्रोफ़ोन एक्सेस की अनुमति दें।",
    },
    vani_mitra_mic_error_not_found: {
        en: "No microphone was found. Please ensure a microphone is connected and enabled, then try again.",
        hi: "कोई माइक्रोफ़ोन नहीं मिला। कृपया सुनिश्चित करें कि एक माइक्रोफ़ोन जुड़ा और सक्षम है, फिर पुनः प्रयास करें।",
    },
    vani_mitra_mic_error_generic: {
        en: "Could not access the microphone. Please check your system settings and browser permissions.",
        hi: "माइक्रोफ़ोन तक नहीं पहुँच सका। कृपया अपनी सिस्टम सेटिंग्स और ब्राउज़र अनुमतियों की जाँच करें।",
    },
    vani_mitra_connection_error: {
        en: "A connection error occurred. Please check your internet and try again.",
        hi: "कनेक्शन में त्रुटि हुई। कृपया अपना इंटरनेट जांचें और पुनः प्रयास करें।",
    },
    // New Chat keys
    chat_button_label: {
        en: "Chat with LegalIQ",
        hi: "लीगलआईक्यू के साथ चैट करें",
    },
    chat_modal_title: {
        en: "Chat with LegalIQ",
        hi: "लीगलआईक्यू के साथ चैट करें",
    },
    chat_welcome_message: {
        en: "Ask me anything about your document. I'll do my best to answer based on the text provided.",
        hi: "अपने दस्तावेज़ के बारे में मुझसे कुछ भी पूछें। मैं दिए गए टेक्स्ट के आधार पर जवाब देने की पूरी कोशिश करूँगा।",
    },
    chat_input_placeholder: {
        en: "Type your question here...",
        hi: "अपना प्रश्न यहाँ लिखें...",
    },
    chat_thinking: {
        en: "LegalIQ is thinking...",
        hi: "लीगलआईक्यू सोच रहा है...",
    },
};

// FIX: Combine all translation objects and export `translations` and `TranslationKeys`
// to resolve import errors across the application.

// Combine all translation parts into one object for easier processing
const combinedTranslations = {
    ...commonTranslations,
    ...emotionalCopy,
    ...trustSection,
    ...testimonialsSection,
    ...useCasesSection,
    ...faqSection,
    ...languagePromptSection,
    ...blogContentSection,
};

// Derive the TranslationKeys type from the keys of the combined object.
export type TranslationKeys = keyof typeof combinedTranslations;

// Restructure the translations from {key: {lang: value}} to {lang: {key: value}}
// This matches the structure expected by the LanguageContext.
export const translations = (['en', 'hi'] as const).reduce(
  (acc, lang) => {
    acc[lang] = {} as Record<TranslationKeys, string>;
    for (const key in combinedTranslations) {
      const typedKey = key as TranslationKeys;
      acc[lang][typedKey] = (combinedTranslations[typedKey] as any)[lang];
    }
    return acc;
  },
  {} as Record<Language, Record<TranslationKeys, string>>
);
