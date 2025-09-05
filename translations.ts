export type Language = 'en' | 'es' | 'ar' | 'zh';

const commonTranslations = {
    tagline: {
        en: 'Legal Clarity for Everyone',
        es: 'Claridad Legal para Todos',
        ar: 'وضوح قانوني للجميع',
        zh: '人人都能看懂的法律',
    },
    footer_copyright: {
        en: 'LegalMitra. All rights reserved.',
        es: 'LegalMitra. Todos los derechos reservados.',
        ar: 'ليجال ميترا. جميع الحقوق محفوظة.',
        zh: 'LegalMitra。版权所有。',
    },
    footer_disclaimer_title: {
        en: 'Disclaimer',
        es: 'Descargo de responsabilidad',
        ar: 'إخلاء مسؤولية',
        zh: '免责声明',
    },
    footer_disclaimer_text: {
        en: 'This tool is AI-powered and does not provide legal advice. The analysis is for informational purposes only.',
        es: 'Esta herramienta funciona con IA y no proporciona asesoramiento legal. El análisis es solo para fines informativos.',
        ar: 'هذه الأداة مدعومة بالذكاء الاصطناعي ولا تقدم استشارات قانونية. التحليل هو لأغراض إعلامية فقط.',
        zh: '本工具由人工智能驱动，不提供法律建议。分析仅供参考。',
    },
    // Loader
    loader_parsing: {
        en: 'Processing File...',
        es: 'Procesando archivo...',
        ar: 'جاري معالجة الملف...',
        zh: '正在处理文件...',
    },
    loader_analyzing: {
        en: 'Analyzing Document...',
        es: 'Analizando documento...',
        ar: 'جاري تحليل المستند...',
        zh: '正在分析文档...',
    },
    // Errors
    error_file_parse_title: {
        en: "File Reading Error",
        es: "Error al Leer el Archivo",
        ar: "خطأ في قراءة الملف",
        zh: "文件读取错误",
    },
    error_file_parse_message: {
        en: "We had trouble reading your file. Please ensure it's a valid, uncorrupted PDF, Word, or text document and try uploading it again.",
        es: "Tuvimos problemas para leer tu archivo. Asegúrate de que sea un documento PDF, Word o de texto válido, no corrupto, e intenta subirlo de nuevo.",
        ar: "واجهتنا مشكلة في قراءة ملفك. يرجى التأكد من أنه مستند PDF أو Word أو نصي صالح وغير تالف وحاول تحميله مرة أخرى.",
        zh: "我们无法读取您的文件。请确保它是一个有效的、未损坏的 PDF、Word 或文本文档，然后重试上传。",
    },
    error_empty_document_title: {
        en: "Empty Document",
        es: "Documento Vacío",
        ar: "مستند فارغ",
        zh: "空文档",
    },
    error_empty_document_message: {
        en: "There's nothing to analyze. Please upload a file or paste text into the box to get started.",
        es: "No hay nada que analizar. Por favor, sube un archivo o pega texto en el cuadro para comenzar.",
        ar: "لا يوجد شيء لتحليله. يرجى تحميل ملف أو لصق نص في المربع للبدء.",
        zh: "没有可分析的内容。请上传文件或将文本粘贴到框中以开始。",
    },
    error_analysis_title: {
        en: "Analysis Failed",
        es: "Falló el Análisis",
        ar: "فشل التحليل",
        zh: "分析失败",
    },
    error_analysis_message: {
        en: "The AI was unable to process the document. This can sometimes happen due to high traffic or an unusual document structure. Please try again in a moment.",
        es: "La IA no pudo procesar el documento. Esto puede ocurrir a veces debido a un alto tráfico o a una estructura inusual del documento. Por favor, inténtalo de nuevo en un momento.",
        ar: "لم يتمكن الذكاء الاصطناعي من معالجة المستند. قد يحدث هذا أحيانًا بسبب حركة المرور العالية أو بنية المستند غير العادية. يرجى المحاولة مرة أخرى بعد لحظات.",
        zh: "AI 无法处理该文档。这有时可能是由于流量过大或文档结构异常造成的。请稍后重试。",
    },
    // Report
    report_title: {
        en: 'Analysis Report',
        es: 'Informe de Análisis',
        ar: 'تقرير التحليل',
        zh: '分析报告',
    },
     report_subtitle: {
        en: "Here's what your trusted Mitra found in your document.",
        es: 'Esto es lo que tu Mitra de confianza encontró en tu documento.',
        ar: 'إليك ما وجده صديقك الموثوق "ميترا" في مستندك.',
        zh: '这是您信赖的 Mitra 在您的文档中发现的内容。',
    },
    report_download_button: {
        en: 'Download PDF Report',
        es: 'Descargar Informe PDF',
        ar: 'تنزيل تقرير PDF',
        zh: '下载 PDF 报告',
    },
    report_summary_title: {
        en: 'In Simple Words, This Document Is About...',
        es: 'En palabras sencillas, este documento trata sobre...',
        ar: 'بعبارات بسيطة، هذا المستند يدور حول...',
        zh: '简单来说，这份文件是关于...',
    },
    report_complexity_title: {
        en: 'Complexity Score',
        es: 'Puntuación de Complejidad',
        ar: 'درجة التعقيد',
        zh: '复杂性评分',
    },
    report_complexity_desc: {
        en: 'How much legal expertise is needed to understand this.',
        es: 'Cuánta experiencia legal se necesita para entender esto.',
        ar: 'ما مدى الخبرة القانونية اللازمة لفهم هذا.',
        zh: '理解这份文件所需的法律专业知识水平。',
    },
    report_swot_title: {
        en: 'A Friend\'s Advice: The Good, The Bad, and The Opportunities',
        es: 'El consejo de un amigo: lo bueno, lo malo y las oportunidades',
        ar: 'نصيحة صديق: الجيد، السيئ، والفرص',
        zh: '朋友的建议：优点、缺点和机遇',
    },
    swot_strengths: {
        en: 'Good Things for You (Strengths)',
        es: 'Cosas buenas para ti (Fortalezas)',
        ar: 'أشياء جيدة لك (نقاط القوة)',
        zh: '对你有利的方面（优势）',
    },
    swot_weaknesses: {
        en: 'Things to Be Careful About (Weaknesses)',
        es: 'Cosas con las que tener cuidado (Debilidades)',
        ar: 'أشياء يجب توخي الحذر بشأنها (نقاط الضعف)',
        zh: '需要注意的方面（劣势）',
    },
    swot_opportunities: {
        en: 'Ways to Make This Better (Opportunities)',
        es: 'Formas de mejorar esto (Oportunidades)',
        ar: 'طرق لتحسين هذا (الفرص)',
        zh: '可以改进的方面（机会）',
    },
    swot_threats: {
        en: 'Potential Dangers (Threats)',
        es: 'Peligros potenciales (Amenazas)',
        ar: 'المخاطر المحتملة (التهديدات)',
        zh: '潜在的风险（威胁）',
    },
    report_redflags_title: {
        en: 'Red Flags: Please Pay Close Attention',
        es: 'Señales de alerta: por favor, preste mucha atención',
        ar: 'علامات حمراء: يرجى الانتباه الشديد',
        zh: '危险信号：请密切注意',
    },
    report_negotiate_title: {
        en: 'Points to Negotiate',
        es: 'Puntos a negociar',
        ar: 'نقاط للتفاوض',
        zh: '可谈判要点',
    },
    report_none_identified: {
        en: 'None identified.',
        es: 'No se identificó ninguno.',
        ar: 'لم يتم تحديد أي شيء.',
        zh: '未发现。',
    },
    report_none_identified_negotiate: {
        en: 'No specific negotiation points were identified.',
        es: 'No se identificaron puntos de negociación específicos.',
        ar: 'لم يتم تحديد نقاط تفاوض محددة.',
        zh: '未发现具体的可谈判要点。',
    },
    // PDF
    pdf_analysis_by: {
        en: 'Analysis by LegalMitra',
        es: 'Análisis por LegalMitra',
        ar: 'تحليل بواسطة LegalMitra',
        zh: '由 LegalMitra 分析',
    },
    pdf_generated_on: { en: 'Generated on', es: 'Generado el', ar: 'تم إنشاؤه في', zh: '生成于'},
    pdf_summary_title: { en: 'Executive Summary', es: 'Resumen Ejecutivo', ar: 'ملخص تنفيذي', zh: '执行摘要'},
    pdf_page: { en: 'Page', es: 'Página', ar: 'صفحة', zh: '页'},
    pdf_of: { en: 'of', es: 'de', ar: 'من', zh: '之'},
    pdf_footer_disclaimer: { en: 'Disclaimer: This is an AI-generated analysis and does not constitute legal advice.', es: 'Descargo de responsabilidad: Este es un análisis generado por IA y no constituye asesoramiento legal.', ar: 'إخلاء مسؤولية: هذا تحليل تم إنشاؤه بواسطة الذكاء الاصطناعي ولا يشكل استشارة قانونية.', zh: '免责声明：这是由人工智能生成的分析，不构成法律建议。'},
    pdf_footer_cta_prefix: {
        en: 'For Free Contract Analysis Use ',
        es: 'Para Análisis de Contratos Gratis, use ',
        ar: 'لتحليل العقود مجانًا، استخدم ',
        zh: '免费合同分析请使用 ',
    },
    pdf_footer_cta_link: {
        en: 'LegalMitra.app',
        es: 'LegalMitra.app',
        ar: 'LegalMitra.app',
        zh: 'LegalMitra.app',
    },
};

const emotionalCopy = {
    hero_title: {
        en: "Feeling Lost in Legal Papers? You're Not Alone.",
        es: "¿Te sientes perdido entre papeles legales? No estás solo.",
        ar: "هل تشعر بالضياع في الأوراق القانونية؟ أنت لست وحدك.",
        zh: "感觉迷失在法律文书中？并非只有您如此。",
    },
    hero_subtitle: {
        en: "Legal documents can be scary. They're filled with words designed to confuse you. We believe everyone deserves to understand what they are signing. Let your friend, LegalMitra, help you find clarity and confidence.",
        es: "Los documentos legales pueden ser intimidantes. Están llenos de palabras diseñadas para confundirte. Creemos que todos merecen entender lo que están firmando. Deja que tu amigo, LegalMitra, te ayude a encontrar claridad y confianza.",
        ar: "يمكن أن تكون المستندات القانونية مخيفة. إنها مليئة بالكلمات المصممة لإرباكك. نحن نؤمن بأن الجميع يستحق أن يفهم ما يوقع عليه. دع صديقك، ليجال ميترا، يساعدك في العثور على الوضوح والثقة.",
        zh: "法律文件可能令人望而生畏。它们充斥着旨在迷惑您的词语。我们相信，每个人都应该了解自己所签署的内容。让您的朋友 LegalMitra 帮助您找到清晰和自信。",
    },
    upload_cta: {
        en: "Upload Your Document. Find Your Peace of Mind.",
        es: "Sube tu documento. Encuentra tu tranquilidad.",
        ar: "قم بتحميل مستندك. اعثر على راحة بالك.",
        zh: "上传您的文件。让您高枕无忧。",
    },
    upload_supported_files: {
        en: "We accept PDF, Word, and text files.",
        es: "Aceptamos archivos PDF, Word y de texto.",
        ar: "نحن نقبل ملفات PDF و Word والنصوص.",
        zh: "我们接受 PDF、Word 和文本文件。",
    },
    upload_or_paste: {
        en: "or simply paste the text",
        es: "o simplemente pega el texto",
        ar: "أو ببساطة الصق النص",
        zh: "或直接粘贴文本",
    },
    upload_placeholder: {
        en: "You can copy and paste the text from your document right here. We promise to keep it safe and private.",
        es: "Puedes copiar y pegar el texto de tu documento aquí mismo. Prometemos mantenerlo seguro y privado.",
        ar: "يمكنك نسخ ولصق النص من مستندك هنا مباشرة. نعد بالحفاظ على سلامته وخصوصيته.",
        zh: "您可以将文档中的文本复制并粘贴到此处。我们承诺会保证其安全和私密。",
    },
    upload_characters: {
        en: "characters",
        es: "caracteres",
        ar: "حرفًا",
        zh: "个字符",
    },
    upload_file: {
        en: "File",
        es: "Archivo",
        ar: "ملف",
        zh: "文件",
    },
    upload_analyze_button: {
        en: "Let's Understand This Together",
        es: "Entendamos esto juntos",
        ar: "دعنا نفهم هذا معًا",
        zh: "让我们一起来理解",
    },
    why_title: {
        en: "Why Trust LegalMitra?",
        es: "¿Por qué confiar en LegalMitra?",
        ar: "لماذا تثق في LegalMitra؟",
        zh: "为何信任 LegalMitra？",
    },
    why_subtitle: {
        en: "Because we built it for you. For the hard-working person who deserves fairness, for the family that needs protection, for everyone who has ever felt overwhelmed by the law.",
        es: "Porque lo construimos para ti. Para la persona trabajadora que merece justicia, para la familia que necesita protección, para todos los que alguna vez se han sentido abrumados por la ley.",
        ar: "لأننا بنيناها من أجلك. للشخص المجتهد الذي يستحق الإنصاف، للأسرة التي تحتاج إلى الحماية، لكل من شعر يومًا بالإرهاق من القانون.",
        zh: "因为我们是为您而构建的。为了值得公平对待的辛勤工作者，为了需要保护的家庭，为了每一个曾被法律压得喘不过气来的人。",
    },
    why_feature_1_title: {
        en: "Clarity in Your Language",
        es: "Claridad en tu idioma",
        ar: "وضوح بلغتك",
        zh: "用您的语言清晰说明",
    },
    why_feature_1_desc: {
        en: "We explain complex legal terms in simple English, with additional support for Hindi, Spanish, Arabic, and Chinese. No more confusion.",
        es: "Explicamos términos legales complejos en un español sencillo, con soporte adicional para inglés, hindi, árabe y chino. No más confusiones.",
        ar: "نشرح المصطلحات القانونية المعقدة باللغة العربية البسيطة، مع دعم إضافي للغات الإنجليزية والهندية والإسبانية والصينية. لا مزيد من الارتباك.",
        zh: "我们用简单的中文解释复杂的法律术语，并额外支持英语、印地语、西班牙语和阿拉伯语。不再有困惑。",
    },
    why_feature_2_title: {
        en: "Your Secrets are Safe",
        es: "Tus secretos están a salvo",
        ar: "أسرارك في أمان",
        zh: "您的秘密是安全的",
    },
    why_feature_2_desc: {
        en: "Your trust is everything. We use top-level security to ensure your documents are private and protected. Always.",
        es: "Tu confianza lo es todo. Utilizamos seguridad de alto nivel para garantizar que tus documentos sean privados y estén protegidos. Siempre.",
        ar: "ثقتك هي كل شيء. نحن نستخدم أمانًا عالي المستوى لضمان خصوصية وحماية مستنداتك. دائمًا.",
        zh: "您的信任就是一切。我们采用顶级的安全措施，确保您的文件私密并受到保护。始终如此。",
    },
    why_feature_3_title: {
        en: "Instant Peace of Mind",
        es: "Tranquilidad instantánea",
        ar: "راحة بال فورية",
        zh: "即时安心",
    },
    why_feature_3_desc: {
        en: "Don't wait for days in anxiety. Get your analysis in seconds. Quick, simple, and always there when you need it.",
        es: "No esperes días con ansiedad. Obtén tu análisis en segundos. Rápido, simple y siempre disponible cuando lo necesites.",
        ar: "لا تنتظر أيامًا في قلق. احصل على تحليلك في ثوانٍ. سريع وبسيط ومتوفر دائمًا عند الحاجة.",
        zh: "不要焦急地等待数日。在几秒钟内获得分析结果。快速、简单，在您需要时随时待命。",
    },
     why_feature_4_title: {
        en: "Actionable Advice",
        es: "Consejos prácticos",
        ar: "نصائح قابلة للتنفيذ",
        zh: "可行的建议",
    },
    why_feature_4_desc: {
        en: "We don't just find problems; we give you points to negotiate. We empower you to ask for better terms.",
        es: "No solo encontramos problemas; te damos puntos para negociar. Te empoderamos para que pidas mejores condiciones.",
        ar: "نحن لا نجد المشاكل فقط؛ بل نمنحك نقاطًا للتفاوض. نحن نمكنك من طلب شروط أفضل.",
        zh: "我们不只发现问题，我们还为您提供谈判要点。我们赋予您争取更优条款的权力。",
    },
    mission_vision_title: {
        en: "Our Promise to You",
        es: "Nuestra promesa para ti",
        ar: "وعدنا لك",
        zh: "我们对您的承诺",
    },
    mission_title: {
        en: "Our Mission",
        es: "Nuestra Misión",
        ar: "مهمتنا",
        zh: "我们的使命",
    },
    mission_text: {
        en: "To stand as a friend ('Mitra') for everyone who feels intimidated by the complexity of law. Our mission is to break down the walls of legal jargon and empower every common person with the clarity and confidence to understand their rights and obligations. We strive to make legal understanding not a privilege, but a fundamental right accessible to all, regardless of their background.",
        es: "Ser un amigo ('Mitra') para todos los que se sienten intimidados por la complejidad de la ley. Nuestra misión es derribar los muros de la jerga legal y empoderar a cada persona común con la claridad y confianza para entender sus derechos y obligaciones. Nos esforzamos por hacer que la comprensión legal no sea un privilegio, sino un derecho fundamental accesible para todos, independientemente de su origen.",
        ar: "أن نكون صديقًا ('ميترا') لكل من يشعر بالرهبة من تعقيدات القانون. مهمتنا هي تحطيم جدران المصطلحات القانونية وتمكين كل شخص عادي بالوضوح والثقة لفهم حقوقه والتزاماته. نحن نسعى جاهدين لجعل الفهم القانوني ليس امتيازًا، بل حقًا أساسيًا متاحًا للجميع، بغض النظر عن خلفيتهم.",
        zh: "作为每个被法律复杂性吓倒的人的朋友（'Mitra'）。我们的使命是打破法律术语的壁垒，赋予每个普通人清晰和自信，以了解他们的权利和义务。我们努力使法律理解不是一种特权，而是无论背景如何，人人都可以享有的基本权利。",
    },
    vision_title: {
        en: "Our Vision",
        es: "Nuestra Visión",
        ar: "رؤيتنا",
        zh: "我们的愿景",
    },
    vision_text: {
        en: "We envision a future where no one has to sign a document in fear or doubt. A future where legal clarity is available at the click of a button, in a language everyone can understand. We envision a future where every person, from a small-town resident to a city professional, is empowered to make informed decisions, fostering a society built on fairness, transparency, and justice for all.",
        es: "Visualizamos un futuro donde nadie tenga que firmar un documento con miedo o duda. Un futuro donde la claridad legal esté disponible con solo hacer clic en un botón, en un idioma que todos puedan entender. Visualizamos un futuro donde cada persona, desde un residente de un pueblo pequeño hasta un profesional de la ciudad, esté empoderada para tomar decisiones informadas, fomentando una sociedad basada en la equidad, la transparencia y la justicia para todos.",
        ar: "نتصور مستقبلاً لا يضطر فيه أحد إلى توقيع مستند في خوف أو شك. مستقبل حيث يكون الوضوح القانوني متاحًا بنقرة زر، بلغة يمكن للجميع فهمها. نتصور مستقبلاً يتم فيه تمكين كل شخص، من ساكن بلدة صغيرة إلى محترف في المدينة، لاتخاذ قرارات مستنيرة، مما يعزز مجتمعًا مبنيًا على الإنصاف والشفافية والعدالة للجميع.",
        zh: "我们展望一个未来，没有人需要在恐惧或怀疑中签署文件。一个只需点击按钮，就能以人人都能理解的语言获得法律清晰度的未来。我们展望一个未来，每个人，从乡镇居民到城市专业人士，都被赋予做出明智决策的能力，从而促进一个建立在公平、透明和全民正义基础上的社会。",
    },
    mission_vision_cta: {
        en: "Start Your Analysis",
        es: "Comienza tu análisis",
        ar: "ابدأ تحليلك",
        zh: "开始您的分析",
    },
    feedback_button_tooltip: {
        en: "Provide Feedback",
        es: "Enviar Comentarios",
        ar: "تقديم ملاحظات",
        zh: "提供反馈"
    },
};

const trustSection = {
    trust_title: {
        en: "Built on a Foundation of Trust & Security",
        es: "Construido sobre una base de confianza y seguridad",
        ar: "مبني على أساس من الثقة والأمان",
        zh: "建立在信任与安全的基础之上",
    },
    trust_subtitle: {
        en: "We take your privacy and the accuracy of our analysis seriously. Here's our commitment to you.",
        es: "Nos tomamos muy en serio tu privacidad y la precisión de nuestro análisis. Este es nuestro compromiso contigo.",
        ar: "نحن نأخذ خصوصيتك ودقة تحليلنا على محمل الجد. إليك التزامنا تجاهك.",
        zh: "我们认真对待您的隐私和我们分析的准确性。这是我们对您的承诺。",
    },
    trust_feature_1_title: {
        en: "Ironclad Privacy",
        es: "Privacidad blindada",
        ar: "خصوصية حديدية",
        zh: "铁甲般的隐私保护",
    },
    trust_feature_1_desc: {
        en: "Your documents are processed securely and are never stored on our servers. What you analyze is for your eyes only.",
        es: "Tus documentos se procesan de forma segura y nunca se almacenan en nuestros servidores. Lo que analizas es solo para tus ojos.",
        ar: "تتم معالجة مستنداتك بشكل آمن ولا يتم تخزينها أبدًا على خوادمنا. ما تقوم بتحليله هو لعينيك فقط.",
        zh: "您的文件经过安全处理，绝不会存储在我们的服务器上。您分析的内容仅供您本人查阅。",
    },
    trust_feature_2_title: {
        en: "Powered by LegalIQ AI™",
        es: "Potenciado por LegalIQ AI™",
        ar: "بدعم من LegalIQ AI™",
        zh: "由 LegalIQ AI™ 提供技术支持",
    },
    trust_feature_2_desc: {
        en: "Our analysis is powered by our proprietary LegalIQ AI™ engine, providing world-class intelligence to decipher complex legal text.",
        es: "Nuestro análisis está impulsado por nuestro motor patentado LegalIQ AI™, que proporciona inteligencia de clase mundial para descifrar textos legales complejos.",
        ar: "تحليلنا مدعوم بمحرك LegalIQ AI™ الخاص بنا، والذي يوفر ذكاءً عالمي المستوى لفك تشفير النصوص القانونية المعقدة.",
        zh: "我们的分析由我们专有的 LegalIQ AI™ 引擎提供支持，该引擎提供世界一流的智能来解读复杂的法律文本。",
    },
    trust_feature_3_title: {
        en: "Objective & Unbiased",
        es: "Objetivo e imparcial",
        ar: "موضوعي وغير متحيز",
        zh: "客观与公正",
    },
    trust_feature_3_desc: {
        en: "Receive a neutral, fact-based analysis. Our AI is trained to be objective, giving you a clear perspective without external influence.",
        es: "Recibe un análisis neutral y basado en hechos. Nuestra IA está entrenada para ser objetiva, dándote una perspectiva clara sin influencias externas.",
        ar: "احصل على تحليل محايد قائم على الحقائق. تم تدريب الذكاء الاصطناعي لدينا ليكون موضوعيًا، مما يمنحك منظورًا واضحًا دون تأثير خارجي.",
        zh: "接收中立、基于事实的分析。我们的人工智能经过客观性训练，为您提供清晰的视角，不受外界影响。",
    }
};

const testimonialsSection = {
    testimonials_title: {
        en: "Don't Just Take Our Word For It",
        es: "No confíes solo en nuestra palabra",
        ar: "لا تأخذ كلمتنا فقط",
        zh: "不要只听我们的一面之词",
    },
    testimonials_subtitle: {
        en: "See how LegalMitra has helped people just like you find clarity and confidence.",
        es: "Mira cómo LegalMitra ha ayudado a personas como tú a encontrar claridad y confianza.",
        ar: "انظر كيف ساعد LegalMitra أشخاصًا مثلك تمامًا في العثور على الوضوح والثقة.",
        zh: "看看 LegalMitra 如何帮助像您一样的人找到清晰和自信。",
    },
    testimonial_1_quote: {
        en: "My rental agreement was full of confusing clauses. LegalMitra broke it down for me in minutes and highlighted a major issue I had missed. It saved me from a lot of future trouble!",
        es: "Mi contrato de alquiler estaba lleno de cláusulas confusas. LegalMitra lo desglosó para mí en minutos y destacó un problema importante que había pasado por alto. ¡Me ahorró muchos problemas futuros!",
        ar: "كان عقد الإيجار الخاص بي مليئًا بالبنود المربكة. قام LegalMitra بتفصيله لي في دقائق وسلط الضوء على مشكلة رئيسية كنت قد أغفلتها. لقد أنقذني من الكثير من المتاعب المستقبلية!",
        zh: "我的租赁协议充满了令人困惑的条款。LegalMitra 在几分钟内为我分析了它，并指出了我遗漏的一个主要问题。它为我避免了很多未来的麻烦！",
    },
    testimonial_1_name: {
        en: "Priya S.",
        es: "Priya S.",
        ar: "بريا س.",
        zh: "Priya S.",
    },
    testimonial_1_role: {
        en: "Software Engineer",
        es: "Ingeniera de Software",
        ar: "مهندسة برمجيات",
        zh: "软件工程师",
    },
    testimonial_2_quote: {
        en: "As a small business owner, I deal with vendor contracts all the time. This tool is a lifesaver. It quickly points out risks and suggests negotiation points. It's like having a lawyer on my team.",
        es: "Como propietario de una pequeña empresa, trato con contratos de proveedores todo el tiempo. Esta herramienta es un salvavidas. Señala rápidamente los riesgos y sugiere puntos de negociación. Es como tener un abogado en mi equipo.",
        ar: "بصفتي صاحب شركة صغيرة، أتعامل مع عقود الموردين طوال الوقت. هذه الأداة منقذة للحياة. إنها تشير بسرعة إلى المخاطر وتقترح نقاط تفاوض. إنه مثل وجود محام في فريقي.",
        zh: "作为一名小企业主，我经常处理供应商合同。这个工具简直是救星。它能迅速指出风险并提出谈判要点。就像我的团队里有了一名律师。",
    },
    testimonial_2_name: {
        en: "David L.",
        es: "David L.",
        ar: "ديفيد ل.",
        zh: "David L.",
    },
    testimonial_2_role: {
        en: "Small Business Owner",
        es: "Propietario de Pequeña Empresa",
        ar: "صاحب شركة صغيرة",
        zh: "小企业主",
    },
    testimonial_3_quote: {
        en: "I was about to sign a freelance contract that seemed standard, but LegalMitra identified a tricky intellectual property clause. Thanks to the clear explanation, I was able to negotiate better terms.",
        es: "Estaba a punto de firmar un contrato de freelance que parecía estándar, pero LegalMitra identificó una cláusula de propiedad intelectual complicada. Gracias a la explicación clara, pude negociar mejores condiciones.",
        ar: "كنت على وشك توقيع عقد عمل حر بدا قياسيًا، لكن LegalMitra حدد شرطًا خادعًا للملكية الفكرية. بفضل الشرح الواضح، تمكنت من التفاوض على شروط أفضل.",
        zh: "我准备签署一份看似标准的自由职业者合同，但 LegalMitra 发现了一个棘手的知识产权条款。多亏了清晰的解释，我成功地谈判到了更好的条款。",
    },
    testimonial_3_name: {
        en: "Sophia M.",
        es: "Sophia M.",
        ar: "صوفيا م.",
        zh: "Sophia M.",
    },
    testimonial_3_role: {
        en: "Freelance Designer",
        es: "Diseñadora Freelance",
        ar: "مصممة مستقلة",
        zh: "自由设计师",
    },
    testimonial_4_quote: {
        en: "Got an internship offer and the contract was so dense. LegalMitra helped me understand the non-compete clause, which was really important for my future career. Felt so much more confident signing it.",
        es: "Recibí una oferta de prácticas y el contrato era muy denso. LegalMitra me ayudó a entender la cláusula de no competencia, que era muy importante para mi futura carrera. Me sentí mucho más seguro al firmarlo.",
        ar: "حصلت على عرض تدريب وكان العقد كثيفًا جدًا. ساعدني LegalMitra في فهم شرط عدم المنافسة، والذي كان مهمًا جدًا لمسيرتي المهنية المستقبلية. شعرت بثقة أكبر عند توقيعه.",
        zh: "我收到了一个实习录用通知，合同内容非常密集。LegalMitra 帮助我理解了竞业禁止条款，这对我未来的职业生涯非常重要。签署时感觉自信多了。",
    },
    testimonial_4_name: {
        en: "Aarav C.",
        es: "Aarav C.",
        ar: "آراف س.",
        zh: "Aarav C.",
    },
    testimonial_4_role: {
        en: "University Student",
        es: "Estudiante Universitario",
        ar: "طالب جامعي",
        zh: "大学生",
    },
    testimonial_5_quote: {
        en: "We were buying our first home and the sale agreement was terrifying. This tool summarized the key points and flagged a weird clause about possession dates. It's a must-have for any big life decision.",
        es: "Estábamos comprando nuestra primera casa y el acuerdo de venta era aterrador. Esta herramienta resumió los puntos clave y marcó una cláusula extraña sobre las fechas de posesión. Es imprescindible para cualquier gran decisión de vida.",
        ar: "كنا نشتري منزلنا الأول وكان اتفاق البيع مرعبًا. لخصت هذه الأداة النقاط الرئيسية وأشارت إلى شرط غريب حول تواريخ الحيازة. إنها أداة لا غنى عنها لأي قرار كبير في الحياة.",
        zh: "我们正在购买我们的第一套房子，销售协议非常吓人。这个工具总结了关键点，并标记了一个关于交房日期的奇怪条款。对于任何重大的生活决定，这都是必备的。",
    },
    testimonial_5_name: {
        en: "Emily & John P.",
        es: "Emily y John P.",
        ar: "إميلي وجون ب.",
        zh: "Emily & John P.",
    },
    testimonial_5_role: {
        en: "First-time Homebuyers",
        es: "Compradores de Primera Vivienda",
        ar: "مشترو منزل لأول مرة",
        zh: "首次购房者",
    },
    testimonial_6_quote: {
        en: "As an artist, licensing my work is crucial. I used LegalMitra to check a licensing agreement, and it helped me understand the royalty terms much better. It's empowering for creators.",
        es: "Como artista, licenciar mi trabajo es crucial. Usé LegalMitra para revisar un acuerdo de licencia y me ayudó a entender mucho mejor los términos de las regalías. Es empoderador para los creadores.",
        ar: "كفنان، ترخيص عملي أمر بالغ الأهمية. استخدمت LegalMitra للتحقق من اتفاقية ترخيص، وساعدني على فهم شروط حقوق الملكية بشكل أفضل. إنه أداة تمكينية للمبدعين.",
        zh: "作为一名艺术家，为我的作品授权至关重要。我使用 LegalMitra 检查了一份授权协议，它帮助我更好地理解了版税条款。它为创作者赋能。",
    },
    testimonial_6_name: {
        en: "Chloe B.",
        es: "Chloe B.",
        ar: "كلوي ب.",
        zh: "Chloe B.",
    },
    testimonial_6_role: {
        en: "Digital Artist",
        es: "Artista Digital",
        ar: "فنانة رقمية",
        zh: "数字艺术家",
    },
    testimonial_7_quote: {
        en: "As a recent law graduate, even I find some contracts confusing. I used LegalMitra to double-check an employment offer. It's incredibly fast and accurate. A great first-pass review tool before deep-diving.",
        es: "Como recién graduado en derecho, incluso yo encuentro algunos contratos confusos. Usé LegalMitra para verificar una oferta de empleo. Es increíblemente rápido y preciso. Una gran herramienta de revisión inicial antes de profundizar.",
        ar: "كخريج قانون حديث، حتى أنا أجد بعض العقود مربكة. استخدمت LegalMitra للتحقق مرة أخرى من عرض عمل. إنه سريع ودقيق بشكل لا يصدق. أداة مراجعة أولية رائعة قبل التعمق.",
        zh: "作为一名新晋的法律毕业生，即使是我也觉得有些合同令人困惑。我用 LegalMitra 复核了一份工作录用通知。它非常快速和准确。是深入研究前的一个很好的初步审查工具。",
    },
    testimonial_7_name: {
        en: "Vikram R.",
        es: "Vikram R.",
        ar: "فيكرام ر.",
        zh: "Vikram R.",
    },
    testimonial_7_role: {
        en: "Law Graduate",
        es: "Graduado en Derecho",
        ar: "خريج قانون",
        zh: "法律毕业生",
    },
    testimonial_8_quote: {
        en: "Running a small NGO means every penny counts. We can't afford expensive legal fees for every grant agreement. LegalMitra gives us the confidence to move forward. It's an invaluable resource for the social sector.",
        es: "Dirigir una pequeña ONG significa que cada céntimo cuenta. No podemos permitirnos costosos honorarios legales por cada acuerdo de subvención. LegalMitra nos da la confianza para seguir adelante. Es un recurso invaluable para el sector social.",
        ar: "إدارة منظمة غير حكومية صغيرة تعني أن كل قرش له قيمة. لا يمكننا تحمل الرسوم القانونية الباهظة لكل اتفاقية منحة. يمنحنا LegalMitra الثقة للمضي قدمًا. إنه مورد لا يقدر بثمن للقطاع الاجتماعي.",
        zh: "运营一个小型非政府组织意味着每一分钱都很重要。我们无法为每一份拨款协议支付昂贵的法律费用。LegalMitra 给了我们前进的信心。它是社会部门的宝贵资源。",
    },
    testimonial_8_name: {
        en: "Fatima K.",
        es: "Fatima K.",
        ar: "فاطمة ك.",
        zh: "Fatima K.",
    },
    testimonial_8_role: {
        en: "NGO Manager",
        es: "Gerente de ONG",
        ar: "مديرة منظمة غير حكومية",
        zh: "非政府组织经理",
    },
    testimonial_9_quote: {
        en: "My insurance claim was rejected with a letter full of legal jargon. I pasted the text into LegalMitra, and it clearly explained the reason for rejection, which helped me write a successful appeal. I'm so grateful!",
        es: "Mi reclamo de seguro fue rechazado con una carta llena de jerga legal. Pegué el texto en LegalMitra y me explicó claramente el motivo del rechazo, lo que me ayudó a escribir una apelación exitosa. ¡Estoy muy agradecido!",
        ar: "تم رفض مطالبة التأمين الخاصة بي برسالة مليئة بالمصطلحات القانونية. قمت بلصق النص في LegalMitra، وشرح بوضوح سبب الرفض، مما ساعدني في كتابة استئناف ناجح. أنا ممتن جدًا!",
        zh: "我的保险索赔被一封充满法律术语的信函驳回了。我将文本粘贴到 LegalMitra 中，它清楚地解释了驳回的原因，这帮助我写出了一份成功的申诉。我非常感激！",
    },
    testimonial_9_name: {
        en: "Gurpreet S.",
        es: "Gurpreet S.",
        ar: "جوربريت س.",
        zh: "Gurpreet S.",
    },
    testimonial_9_role: {
        en: "High School Teacher",
        es: "Profesor de Secundaria",
        ar: "مدرس في مدرسة ثانوية",
        zh: "高中教师",
    },
};

const useCasesSection = {
    use_cases_title: {
        en: "Who Can LegalMitra Help?",
        es: "¿A quién puede ayudar LegalMitra?",
        ar: "من يمكن لـ LegalMitra مساعدته؟",
        zh: "LegalMitra 能帮助谁？",
    },
    use_cases_subtitle: {
        en: "From major life decisions to everyday contracts, we're here to provide clarity for everyone.",
        es: "Desde decisiones importantes de la vida hasta contratos cotidianos, estamos aquí para brindar claridad a todos.",
        ar: "من قرارات الحياة الكبرى إلى العقود اليومية، نحن هنا لتوفير الوضوح للجميع.",
        zh: "从重大生活决策到日常合同，我们致力于为每个人提供清晰的说明。",
    },
    use_cases_1_title: { en: "Renters & Tenants", es: "Inquilinos y Arrendatarios", ar: "المستأجرون والمؤجرون", zh: "租客与房客" },
    use_cases_1_desc: { en: "Analyze your lease agreement to understand your rights, responsibilities, and any tricky clauses before you sign.", es: "Analiza tu contrato de arrendamiento para comprender tus derechos, responsabilidades y cualquier cláusula complicada antes de firmar.", ar: "حلل اتفاقية الإيجار الخاصة بك لفهم حقوقك ومسؤولياتك وأي بنود خادعة قبل التوقيع.", zh: "在签署之前分析您的租赁协议，以了解您的权利、责任和任何棘手的条款。" },
    use_cases_2_title: { en: "Employees", es: "Empleados", ar: "الموظفون", zh: "员工" },
    use_cases_2_desc: { en: "Review your job offer or employment contract. Understand salary terms, non-compete clauses, and termination policies.", es: "Revisa tu oferta de trabajo o contrato de empleo. Comprende los términos salariales, las cláusulas de no competencia y las políticas de terminación.", ar: "راجع عرض العمل أو عقد التوظيف الخاص بك. افهم شروط الراتب وشروط عدم المنافسة وسياسات الإنهاء.", zh: "审查您的工作录用通知或雇佣合同。了解薪资条款、竞业禁止条款和解雇政策。" },
    use_cases_3_title: { en: "Freelancers", es: "Autónomos", ar: "المستقلون", zh: "自由职业者" },
    use_cases_3_desc: { en: "Check client contracts to ensure fair payment terms, clear deliverables, and proper intellectual property rights.", es: "Verifica los contratos de los clientes para garantizar condiciones de pago justas, entregables claros y derechos de propiedad intelectual adecuados.", ar: "تحقق من عقود العملاء لضمان شروط دفع عادلة وتسليمات واضحة وحقوق ملكية فكرية مناسبة.", zh: "检查客户合同，确保付款条款公平、交付成果明确、知识产权适当。" },
    use_cases_4_title: { en: "Small Business Owners", es: "Propietarios de Pequeñas Empresas", ar: "أصحاب الأعمال الصغيرة", zh: "小企业主" },
    use_cases_4_desc: { en: "Vet vendor agreements, partnership deals, or service contracts to protect your business interests and avoid risks.", es: "Examina acuerdos con proveedores, acuerdos de asociación o contratos de servicio para proteger los intereses de tu negocio y evitar riesgos.", ar: "افحص اتفاقيات الموردين وصفقات الشراكة أو عقود الخدمة لحماية مصالح عملك وتجنب المخاطر.", zh: "审查供应商协议、合作交易或服务合同，以保护您的商业利益并避免风险。" },
    use_cases_5_title: { en: "Homebuyers", es: "Compradores de Vivienda", ar: "مشترو المنازل", zh: "购房者" },
    use_cases_5_desc: { en: "Decipher complex property sale agreements. Understand payment schedules, possession terms, and penalty clauses.", es: "Descifra acuerdos complejos de compraventa de propiedades. Comprende los cronogramas de pago, los términos de posesión y las cláusulas de penalización.", ar: "فك شفرة اتفاقيات بيع العقارات المعقدة. افهم جداول الدفع وشروط الحيازة وشروط الجزاء.", zh: "解读复杂的房产销售协议。了解付款时间表、占有条款和罚款条款。" },
    use_cases_6_title: { en: "Students", es: "Estudiantes", ar: "الطلاب", zh: "学生" },
    use_cases_6_desc: { en: "Understand your internship offer or education loan documents. Know your stipend, responsibilities, and repayment terms.", es: "Entiende tu oferta de prácticas o los documentos de tu préstamo educativo. Conoce tu estipendio, responsabilidades y términos de pago.", ar: "افهم عرض التدريب أو مستندات قرض التعليم. اعرف راتبك ومسؤولياتك وشروط السداد.", zh: "了解您的实习录用通知或教育贷款文件。了解您的津贴、责任和还款条款。" },
    use_cases_7_title: { en: "Creators & Artists", es: "Creadores y Artistas", ar: "المبدعون والفنانون", zh: "创作者与艺术家" },
    use_cases_7_desc: { en: "Clarify licensing agreements or royalty contracts to ensure you are fairly compensated for your creative work.", es: "Aclara los acuerdos de licencia o los contratos de regalías para asegurarte de que se te compense de manera justa por tu trabajo creativo.", ar: "وضح اتفاقيات الترخيص أو عقود حقوق الملكية لضمان حصولك على تعويض عادل عن عملك الإبداعي.", zh: "明确许可协议或版税合同，以确保您的创作工作得到公平的报酬。" },
    use_cases_8_title: { en: "Online Users", es: "Usuarios en Línea", ar: "مستخدمو الإنترنت", zh: "在线用户" },
    use_cases_8_desc: { en: "Make sense of Terms of Service or Privacy Policies before you click 'agree'. Know how your data is being used.", es: "Entiende los Términos de Servicio o las Políticas de Privacidad antes de hacer clic en 'aceptar'. Conoce cómo se utilizan tus datos.", ar: "افهم شروط الخدمة أو سياسات الخصوصية قبل النقر على 'أوافق'. اعرف كيف يتم استخدام بياناتك.", zh: "在点击“同意”之前，请先理解服务条款或隐私政策。了解您的数据是如何被使用的。" },
    use_cases_9_title: { en: "Entrepreneurs", es: "Emprendedores", ar: "رواد الأعمال", zh: "企业家" },
    use_cases_9_desc: { en: "Quickly evaluate Non-Disclosure Agreements (NDAs) to protect your startup's confidential information.", es: "Evalúa rápidamente los Acuerdos de Confidencialidad (NDA) para proteger la información confidencial de tu startup.", ar: "قم بتقييم اتفاقيات عدم الإفصاح (NDAs) بسرعة لحماية المعلومات السرية لشركتك الناشئة.", zh: "快速评估保密协议（NDA），以保护您的初创公司的机密信息。" },
    use_cases_10_title: { en: "Insurance Claimants", es: "Reclamantes de Seguros", ar: "مطالبو التأمين", zh: "保险索赔人" },
    use_cases_10_desc: { en: "Understand insurance settlement documents to know the compensation details and release of liability terms.", es: "Entiende los documentos de liquidación de seguros para conocer los detalles de la compensación y los términos de liberación de responsabilidad.", ar: "افهم مستندات تسوية التأمين لمعرفة تفاصيل التعويض وشروط الإعفاء من المسؤولية.", zh: "理解保险和解文件，以了解赔偿细节和责任免除条款。" },
};

const faqSection = {
    faq_title: {
        en: "Frequently Asked Questions",
        es: "Preguntas Frecuentes",
        ar: "الأسئلة المتداولة",
        zh: "常见问题",
    },
    faq_subtitle: {
        en: "Have questions? We have answers. Here are some of the most common things people ask.",
        es: "¿Tienes preguntas? Tenemos respuestas. Aquí están algunas de las cosas más comunes que la gente pregunta.",
        ar: "هل لديك أسئلة؟ لدينا إجابات. إليك بعض الأشياء الأكثر شيوعًا التي يسألها الناس.",
        zh: "有问题吗？我们有答案。这里有一些人们最常问的问题。",
    },
    faq_q1: { en: "What is LegalMitra?", es: "¿Qué es LegalMitra?", ar: "ما هو LegalMitra؟", zh: "什么是 LegalMitra？" },
    faq_a1: {
        en: "LegalMitra is an advanced AI contract review tool designed to help ordinary people understand complex legal documents. It acts as a friend ('Mitra') to demystify legal jargon, providing simple summaries, identifying potential risks, and suggesting points for negotiation.",
        es: "LegalMitra es una herramienta avanzada de revisión de contratos con IA diseñada para ayudar a la gente común a entender documentos legales complejos. Actúa como un amigo ('Mitra') para desmitificar la jerga legal, proporcionando resúmenes simples, identificando riesgos potenciales y sugiriendo puntos de negociación.",
        ar: "LegalMitra هي أداة متقدمة لمراجعة العقود بالذكاء الاصطناعي مصممة لمساعدة الناس العاديين على فهم المستندات القانونية المعقدة. تعمل كصديق ('ميترا') لإزالة الغموض عن المصطلحات القانونية، وتوفير ملخصات بسيطة، وتحديد المخاطر المحتملة، واقتراح نقاط للتفاوض.",
        zh: "LegalMitra 是一款先进的人工智能合同审查工具，旨在帮助普通人理解复杂的法律文件。它扮演着朋友（'Mitra'）的角色，揭开法律术语的神秘面纱，提供简单的摘要，识别潜在风险，并提出谈判要点。",
    },
    faq_q2: { en: "How does your contract analysis AI work?", es: "¿Cómo funciona su IA de análisis de contratos?", ar: "كيف يعمل الذكاء الاصطناعي الخاص بتحليل العقود لديكم؟", zh: "你们的合同分析人工智能是如何工作的？" },
    faq_a2: {
        en: "Our contract analysis AI is powered by our state-of-the-art LegalIQ AI™ engine. When you upload or paste a document, the AI performs a deep artificial intelligence contract analysis, breaking down the text into key components like strengths, weaknesses, red flags, and negotiation points, presenting them in an easy-to-understand report.",
        es: "Nuestra IA para el análisis de contratos funciona con nuestro motor de última generación LegalIQ AI™. Cuando subes o pegas un documento, la IA realiza un análisis profundo de contratos con inteligencia artificial, desglosando el texto en componentes clave como fortalezas, debilidades, señales de alerta y puntos de negociación, presentándolos en un informe fácil de entender.",
        ar: "يتم تشغيل الذكاء الاصطناعي الخاص بنا لتحليل العقود بواسطة محرك LegalIQ AI™ المتطور الخاص بنا. عندما تقوم بتحميل أو لصق مستند، يقوم الذكاء الاصطناعي بإجراء تحليل عميق للعقد بالذكاء الاصطناعي، وتقسيم النص إلى مكونات رئيسية مثل نقاط القوة والضعف والعلامات الحمراء ونقاط التفاوض، وتقديمها في تقرير سهل الفهم.",
        zh: "我们的合同分析人工智能由我们最先进的 LegalIQ AI™ 引擎提供支持。当您上传或粘贴文档时，人工智能会执行深度人工智能合同分析，将文本分解为优势、劣势、危险信号和谈判要点等关键组成部分，并以易于理解的报告形式呈现。",
    },
    faq_q3: { en: "Is this a free contract review software?", es: "¿Es este un software de revisión de contratos gratuito?", ar: "هل هذا برنامج مراجعة عقود مجاني؟", zh: "这是免费的合同审查软件吗？" },
    faq_a3: {
        en: "Yes, LegalMitra is currently offered as a free contract review software. Our mission is to make legal clarity accessible to everyone, and we believe cost should not be a barrier to understanding your rights and obligations.",
        es: "Sí, LegalMitra se ofrece actualmente como un software de revisión de contratos gratuito. Nuestra misión es hacer que la claridad legal sea accesible para todos, y creemos que el costo no debe ser una barrera para comprender tus derechos y obligaciones.",
        ar: "نعم، يتم تقديم LegalMitra حاليًا كبرنامج مجاني لمراجعة العقود. مهمتنا هي جعل الوضوح القانوني متاحًا للجميع، ونعتقد أن التكلفة لا ينبغي أن تكون عائقًا أمام فهم حقوقك والتزاماتك.",
        zh: "是的，LegalMitra 目前作为免费合同审查软件提供。我们的使命是让每个人都能获得法律清晰度，我们认为成本不应成为理解您的权利和义务的障碍。",
    },
    faq_q4: { en: "What makes LegalMitra the best AI contract review software?", es: "¿Qué hace que LegalMitra sea el mejor software de revisión de contratos con IA?", ar: "ما الذي يجعل LegalMitra أفضل برنامج لمراجعة العقود بالذكاء الاصطناعي؟", zh: "是什么让 LegalMitra 成为最好的人工智能合同审查软件？" },
    faq_a4: {
        en: "While 'best' is subjective, we strive to be the best AI contract review software by focusing on the user's emotional journey. We provide not just technical analysis but also clarity and confidence. Our tool offers multi-language support and focuses on actionable advice, which sets our contract review software AI apart.",
        es: "Aunque 'mejor' es subjetivo, nos esforzamos por ser el mejor software de revisión de contratos con IA centrándonos en el viaje emocional del usuario. No solo proporcionamos análisis técnico, sino también claridad y confianza. Nuestra herramienta ofrece soporte en varios idiomas y se centra en consejos prácticos, lo que diferencia a nuestro software de revisión de contratos con IA.",
        ar: "بينما كلمة 'الأفضل' ذاتية، فإننا نسعى جاهدين لنكون أفضل برنامج لمراجعة العقود بالذكاء الاصطناعي من خلال التركيز على رحلة المستخدم العاطفية. نحن لا نقدم تحليلًا تقنيًا فحسب، بل نقدم أيضًا الوضوح والثقة. توفر أداتنا دعمًا متعدد اللغات وتركز على النصائح القابلة للتنفيذ، مما يميز برنامجنا لمراجعة العقود بالذكاء الاصطناعي.",
        zh: "虽然“最好”是主观的，但我们通过关注用户的情感旅程，努力成为最好的人工智能合同审查软件。我们不仅提供技术分析，还提供清晰度和信心。我们的工具提供多语言支持，并专注于可行的建议，这使我们的人工智能合同审查软件脱颖而出。",
    },
    faq_q5: { en: "What types of documents can I analyze with this tool?", es: "¿Qué tipos de documentos puedo analizar con esta herramienta?", ar: "ما أنواع المستندات التي يمكنني تحليلها باستخدام هذه الأداة؟", zh: "我可以使用此工具分析哪些类型的文档？" },
    faq_a5: {
        en: "You can use LegalMitra for a wide range of documents. It's an effective legal contract review software for rental agreements, employment contracts, freelance agreements, terms of service, and vendor contracts. Essentially, any text-based legal document can be analyzed.",
        es: "Puedes usar LegalMitra para una amplia gama de documentos. Es un software de revisión de contratos legales eficaz para contratos de alquiler, contratos de trabajo, acuerdos de freelance, términos de servicio y contratos con proveedores. Esencialmente, se puede analizar cualquier documento legal basado en texto.",
        ar: "يمكنك استخدام LegalMitra لمجموعة واسعة من المستندات. إنه برنامج فعال لمراجعة العقود القانونية لاتفاقيات الإيجار وعقود العمل واتفاقيات العمل الحر وشروط الخدمة وعقود الموردين. بشكل أساسي، يمكن تحليل أي مستند قانوني نصي.",
        zh: "您可以使用 LegalMitra 处理各种文档。它是一款有效的法律合同审查软件，适用于租赁协议、雇佣合同、自由职业者协议、服务条款和供应商合同。基本上，任何基于文本的法律文件都可以进行分析。",
    },
    faq_q6: { en: "How secure is my data with your contract review automation software?", es: "¿Qué tan seguros están mis datos con su software de automatización de revisión de contratos?", ar: "ما مدى أمان بياناتي مع برنامج أتمتة مراجعة العقود الخاص بكم؟", zh: "我的数据在你们的合同审查自动化软件中有多安全？" },
    faq_a6: {
        en: "Your privacy is our top priority. Our contract review automation software processes your document securely and does not store it on our servers after the analysis is complete. The entire process is designed to be private and for your eyes only.",
        es: "Tu privacidad es nuestra máxima prioridad. Nuestro software de automatización de revisión de contratos procesa tu documento de forma segura y no lo almacena en nuestros servidores una vez finalizado el análisis. Todo el proceso está diseñado para ser privado y solo para tus ojos.",
        ar: "خصوصيتك هي أولويتنا القصوى. يقوم برنامج أتمتة مراجعة العقود الخاص بنا بمعالجة مستندك بشكل آمن ولا يخزنه على خوادمنا بعد اكتمال التحليل. تم تصميم العملية بأكملها لتكون خاصة ولعينيك فقط.",
        zh: "您的隐私是我们的重中之重。我们的合同审查自动化软件会安全地处理您的文档，并且在分析完成后不会将其存储在我们的服务器上。整个过程都设计为私密的，仅供您本人查阅。",
    },
    faq_q7: { en: "How is this different from other automated contract review software?", es: "¿En qué se diferencia de otros software de revisión de contratos automatizados?", ar: "كيف يختلف هذا عن برامج مراجعة العقود الآلية الأخرى؟", zh: "这与其他自动化合同审查软件有何不同？" },
    faq_a7: {
        en: "Many automated contract review software solutions are built for legal professionals. LegalMitra is designed specifically for the common person. We prioritize simple language, emotional support, and empowerment over dense, technical legal analysis, making us one of the most user-friendly contract review tools available.",
        es: "Muchas soluciones de software de revisión de contratos automatizados están diseñadas para profesionales del derecho. LegalMitra está diseñado específicamente para la persona común. Priorizamos el lenguaje simple, el apoyo emocional y el empoderamiento sobre el análisis legal denso y técnico, lo que nos convierte en una de las herramientas de revisión de contratos más fáciles de usar disponibles.",
        ar: "تم تصميم العديد من حلول برامج مراجعة العقود الآلية للمهنيين القانونيين. تم تصميم LegalMitra خصيصًا للشخص العادي. نحن نعطي الأولوية للغة البسيطة والدعم العاطفي والتمكين على التحليل القانوني الفني الكثيف، مما يجعلنا واحدة من أكثر أدوات مراجعة العقود سهولة في الاستخدام المتاحة.",
        zh: "许多自动化合同审查软件解决方案是为法律专业人士构建的。LegalMitra 专为普通人设计。我们优先考虑简单的语言、情感支持和赋权，而不是密集的、技术性的法律分析，这使我们成为最用户友好的合同审查工具之一。",
    },
    faq_q8: { en: "Can LegalMitra replace a lawyer?", es: "¿Puede LegalMitra reemplazar a un abogado?", ar: "هل يمكن لـ LegalMitra أن يحل محل المحامي؟", zh: "LegalMitra 可以取代律师吗？" },
    faq_a8: {
        en: "No. LegalMitra is a powerful informational contract review tool, but it does not provide legal advice and is not a substitute for a qualified lawyer. We strongly recommend consulting a legal professional for complex situations or before making any significant decisions. Our goal is to make you a more informed client.",
        es: "No. LegalMitra es una potente herramienta informativa de revisión de contratos, pero no proporciona asesoramiento legal y no sustituye a un abogado cualificado. Recomendamos encarecidamente consultar a un profesional del derecho para situaciones complejas o antes de tomar decisiones importantes. Nuestro objetivo es convertirte en un cliente más informado.",
        ar: "لا. LegalMitra هي أداة قوية لمراجعة العقود المعلوماتية، لكنها لا تقدم استشارات قانونية وليست بديلاً عن محامٍ مؤهل. نوصي بشدة باستشارة متخصص قانوني في المواقف المعقدة أو قبل اتخاذ أي قرارات مهمة. هدفنا هو أن نجعلك عميلاً أكثر اطلاعاً.",
        zh: "不能。LegalMitra 是一款功能强大的信息性合同审查工具，但它不提供法律建议，也不能替代合格的律师。我们强烈建议在复杂情况下或在做出任何重大决定之前咨询法律专业人士。我们的目标是让您成为一个更知情的客户。",
    },
    faq_q9: { en: "What are the main benefits of using AI contract review tools?", es: "¿Cuáles son los principales beneficios de usar herramientas de revisión de contratos con IA?", ar: "ما هي الفوائد الرئيسية لاستخدام أدوات مراجعة العقود بالذكاء الاصطناعي؟", zh: "使用人工智能合同审查工具有哪些主要好处？" },
    faq_a9: {
        en: "The main benefits of using AI contract review tools like ours are speed, efficiency, and clarity. You get an initial analysis in seconds, which can help you quickly identify potential issues and understand the core aspects of a document without needing to spend hours deciphering it yourself.",
        es: "Los principales beneficios de usar herramientas de revisión de contratos con IA como la nuestra son la velocidad, la eficiencia y la claridad. Obtienes un análisis inicial en segundos, lo que puede ayudarte a identificar rápidamente posibles problemas y a comprender los aspectos centrales de un documento sin necesidad de pasar horas descifrándolo tú mismo.",
        ar: "الفوائد الرئيسية لاستخدام أدوات مراجعة العقود بالذكاء الاصطناعي مثل أداتنا هي السرعة والكفاءة والوضوح. تحصل على تحليل أولي في ثوانٍ، مما يساعدك على تحديد المشكلات المحتملة بسرعة وفهم الجوانب الأساسية للمستند دون الحاجة إلى قضاء ساعات في فك شفرته بنفسك.",
        zh: "使用像我们这样的人工智能合同审查工具的主要好处是速度、效率和清晰度。您可以在几秒钟内获得初步分析，这可以帮助您快速识别潜在问题并理解文档的核心方面，而无需花费数小时自己解读。",
    },
    faq_q10: { en: "What file formats does your contract review software support?", es: "¿Qué formatos de archivo admite su software de revisión de contratos?", ar: "ما هي تنسيقات الملفات التي يدعمها برنامج مراجعة العقود الخاص بكم؟", zh: "你们的合同审查软件支持哪些文件格式？" },
    faq_a10: {
        en: "Our contract review software supports PDF, Microsoft Word (.docx), and plain text (.txt, .rtf) files. You can also simply copy and paste the text directly into the text area for analysis.",
        es: "Nuestro software de revisión de contratos admite archivos PDF, Microsoft Word (.docx) y texto sin formato (.txt, .rtf). También puedes simplemente copiar y pegar el texto directamente en el área de texto para su análisis.",
        ar: "يدعم برنامج مراجعة العقود لدينا ملفات PDF و Microsoft Word (.docx) والنص العادي (.txt ، .rtf). يمكنك أيضًا ببساطة نسخ ولصق النص مباشرة في منطقة النص لتحليله.",
        zh: "我们的合同审查软件支持 PDF、Microsoft Word (.docx) 和纯文本（.txt、.rtf）文件。您也可以直接将文本复制并粘贴到文本区域进行分析。",
    },
};


export type TranslationKeys = keyof typeof commonTranslations | keyof typeof emotionalCopy | keyof typeof trustSection | keyof typeof testimonialsSection | keyof typeof useCasesSection | keyof typeof faqSection;

type Translations = {
  [key in Language]: {
    [key in TranslationKeys]: string;
  };
};

// FIX: Restructure the translation data from a per-key language mapping 
// to a per-language key mapping to match the expected `Translations` type.
// This also removes an incorrect proxy implementation that was causing type errors.
const languages: Language[] = ['en', 'es', 'ar', 'zh'];
const allTranslationSources = { ...commonTranslations, ...emotionalCopy, ...trustSection, ...testimonialsSection, ...useCasesSection, ...faqSection };

const generatedTranslations = {} as Translations;

for (const lang of languages) {
    generatedTranslations[lang] = {} as { [key in TranslationKeys]: string };
    for (const key in allTranslationSources) {
        if (Object.prototype.hasOwnProperty.call(allTranslationSources, key)) {
            const typedKey = key as TranslationKeys;
            const source = allTranslationSources[typedKey] as Record<Language, string>;
            if (source[lang]) {
                generatedTranslations[lang][typedKey] = source[lang];
            }
        }
    }
}
export const translations: Translations = generatedTranslations;