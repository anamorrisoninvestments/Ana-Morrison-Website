import type { Locale } from "./config";

type Dict = {
  nav: { home: string; about: string; str: string; taxDeed: string; caseStudies: string; resources: string; blog: string; contact: string; ctaWork: string };
  footer: { newsletter: string; newsletterSub: string; navigation: string; contact: string; ctaWork: string; whatsapp: string; privacy: string; cookies: string; terms: string; preferences: string; rights: string };
  locale: { switchLabel: string; ariaCurrent: string };
  common: { readMore: string; scroll: string; loading: string };
  contactForm: {
    title: string; subtitle: string;
    interestPick: string;
    fields: { fullName: string; email: string; phone: string; whatsapp: string; propertyType: string; platform: string; message: string; experience: string; capital: string; property: string; };
    labels: { propertyLocation: string; propertyDetails: string; };
    consent: string;
    submit: string;
    submitting: string;
    success: string;
    errors: { rate: string; invalid: string; network: string; generic: string; required: string; email: string; };
    interests: { label: string; description: string; key: string }[];
    optional: string;
    required: string;
  };
  consent: {
    title: string;
    body: string;
    accept: string;
    reject: string;
    manage: string;
    preferencesTitle: string;
    necessary: string;
    necessaryDesc: string;
    analytics: string;
    analyticsDesc: string;
    marketing: string;
    marketingDesc: string;
    save: string;
    close: string;
  };
  legal: {
    draftBanner: string;
  };
  localeSuggestion: {
    detected: string;
    viewIn: string;
    stayIn: string;
  };
};

const ES: Dict = {
  nav: {
    home: "Inicio",
    about: "Sobre Ana",
    str: "Alquileres a Corto Plazo",
    taxDeed: "Tax Deed",
    caseStudies: "Casos de Éxito",
    resources: "Recursos",
    blog: "Blog",
    contact: "Contacto",
    ctaWork: "Trabaja Conmigo",
  },
  footer: {
    newsletter: "Newsletter gratuito",
    newsletterSub: "Estrategias de inversión que no comparto en redes.",
    navigation: "Navegación",
    contact: "Contacto",
    ctaWork: "Trabajemos Juntos",
    whatsapp: "WhatsApp",
    privacy: "Política de Privacidad",
    cookies: "Política de Cookies",
    terms: "Términos de Uso",
    preferences: "Preferencias de Cookies",
    rights: "Todos los derechos reservados.",
  },
  locale: { switchLabel: "Ver en inglés", ariaCurrent: "Español" },
  common: { readMore: "Leer más", scroll: "Scroll", loading: "Cargando..." },
  contactForm: {
    title: "Cuéntame de tu propiedad o tu oportunidad.",
    subtitle: "Elige la opción que mejor describe tu momento. Respondo personalmente en menos de 24 horas hábiles.",
    interestPick: "¿En qué puedo ayudarte?",
    fields: { fullName: "Nombre completo", email: "Email", phone: "Teléfono", whatsapp: "WhatsApp (opcional)", propertyType: "Tipo de propiedad", platform: "Plataforma actual", message: "Mensaje", experience: "Experiencia como inversionista", capital: "Capital disponible", property: "Propiedad" },
    labels: { propertyLocation: "Ubicación de la propiedad", propertyDetails: "Detalles de la propiedad" },
    consent: "Al enviar, acepto que AnaMaría Morrison pueda contactarme y que se procesen mis datos según la Política de Privacidad.",
    submit: "Enviar mensaje",
    submitting: "Enviando...",
    success: "¡Recibido! Te responderé en menos de 24 horas hábiles.",
    errors: {
      rate: "Has enviado varios mensajes. Por favor espera un momento antes de reintentar.",
      invalid: "Revisa los campos y vuelve a intentar.",
      network: "Problema de conexión. Vuelve a intentar en unos segundos.",
      generic: "Ocurrió un error. Por favor vuelve a intentar.",
      required: "Este campo es obligatorio.",
      email: "Ingresa un email válido.",
    },
    interests: [
      { key: "str-rentabilizar", label: "Quiero rentabilizar una propiedad", description: "Tengo una propiedad y quiero convertirla en alquiler a corto plazo." },
      { key: "str-administracion", label: "Quiero administración STR", description: "Necesito que administren profesionalmente mi propiedad STR." },
      { key: "str-preparacion", label: "Quiero preparar y lanzar una propiedad", description: "Diseño, amoblado, fotos, listing y puesta en marcha." },
      { key: "tax-deed-aprender", label: "Quiero aprender sobre Tax Deed", description: "Formación y educación sobre subastas del condado." },
      { key: "tax-deed-oportunidades", label: "Quiero analizar oportunidades Tax Deed", description: "Consulta 1:1 sobre subastas del condado." },
      { key: "entrevista", label: "Invitar a Ana a una entrevista o evento", description: "Podcasts, medios, keynotes o eventos corporativos." },
      { key: "otro", label: "Otro", description: "Cuéntame de qué se trata." },
    ],
    optional: "opcional",
    required: "obligatorio",
  },
  consent: {
    title: "Usamos cookies",
    body: "Usamos cookies estrictamente necesarias para el funcionamiento del sitio, y opcionalmente cookies de análisis y marketing con tu consentimiento.",
    accept: "Aceptar todo",
    reject: "Rechazar opcionales",
    manage: "Configurar",
    preferencesTitle: "Preferencias de cookies",
    necessary: "Necesarias",
    necessaryDesc: "Requeridas para el funcionamiento del sitio. No se pueden desactivar.",
    analytics: "Análisis",
    analyticsDesc: "Nos ayudan a entender cómo usas el sitio.",
    marketing: "Marketing",
    marketingDesc: "Para futuras campañas. Actualmente inactivas.",
    save: "Guardar preferencias",
    close: "Cerrar",
  },
  legal: {
    draftBanner: "Este documento es una versión provisional en revisión legal. La versión final se publicará próximamente.",
  },
  localeSuggestion: {
    detected: "Parece que prefieres inglés.",
    viewIn: "Ver en inglés",
    stayIn: "Continuar en español",
  },
};

const EN: Dict = {
  nav: {
    home: "Home",
    about: "About",
    str: "Short-Term Rentals",
    taxDeed: "Tax Deed Investing",
    caseStudies: "Case Studies",
    resources: "Resources",
    blog: "Blog",
    contact: "Contact",
    ctaWork: "Work With Me",
  },
  footer: {
    newsletter: "Free newsletter",
    newsletterSub: "Investment strategies I don't share on social media.",
    navigation: "Navigation",
    contact: "Contact",
    ctaWork: "Let's Work Together",
    whatsapp: "WhatsApp",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    terms: "Terms of Use",
    preferences: "Cookie Preferences",
    rights: "All rights reserved.",
  },
  locale: { switchLabel: "Ver en español", ariaCurrent: "English" },
  common: { readMore: "Read more", scroll: "Scroll", loading: "Loading..." },
  contactForm: {
    title: "Tell me about your property or your opportunity.",
    subtitle: "Choose the option that best describes your situation. I respond personally within 24 business hours.",
    interestPick: "How can I help you?",
    fields: { fullName: "Full name", email: "Email", phone: "Phone", whatsapp: "WhatsApp (optional)", propertyType: "Property type", platform: "Current platform", message: "Message", experience: "Investor experience", capital: "Available capital", property: "Property" },
    labels: { propertyLocation: "Property location", propertyDetails: "Property details" },
    consent: "By submitting, I agree that AnaMaría Morrison may contact me and that my data will be processed per the Privacy Policy.",
    submit: "Send message",
    submitting: "Sending...",
    success: "Received. I'll get back to you within 24 business hours.",
    errors: {
      rate: "You've sent several messages recently. Please wait a moment before retrying.",
      invalid: "Please review the fields and try again.",
      network: "Connection issue. Please retry in a few seconds.",
      generic: "Something went wrong. Please try again.",
      required: "This field is required.",
      email: "Please enter a valid email.",
    },
    interests: [
      { key: "str-rentabilizar", label: "I want to improve my property's performance", description: "I own a property and want to operate it as a short-term rental." },
      { key: "str-administracion", label: "I want professional STR management", description: "I need professional management of my STR property." },
      { key: "str-preparacion", label: "I want to prepare and launch a property", description: "Design, furnishing, photos, listing, and go-live." },
      { key: "tax-deed-aprender", label: "I want to learn about Tax Deed", description: "Education about county tax deed auctions." },
      { key: "tax-deed-oportunidades", label: "I want to evaluate Tax Deed opportunities", description: "1:1 consultation about county auctions." },
      { key: "entrevista", label: "Invite AnaMaría to an interview or event", description: "Podcasts, media, keynotes, or corporate events." },
      { key: "otro", label: "Other", description: "Tell me what it's about." },
    ],
    optional: "optional",
    required: "required",
  },
  consent: {
    title: "We use cookies",
    body: "We use strictly necessary cookies for the site to work, and optionally analytics and marketing cookies with your consent.",
    accept: "Accept all",
    reject: "Reject optional",
    manage: "Manage",
    preferencesTitle: "Cookie preferences",
    necessary: "Necessary",
    necessaryDesc: "Required for the site to work. Cannot be disabled.",
    analytics: "Analytics",
    analyticsDesc: "Help us understand how you use the site.",
    marketing: "Marketing",
    marketingDesc: "For future campaigns. Currently inactive.",
    save: "Save preferences",
    close: "Close",
  },
  legal: {
    draftBanner: "This document is a provisional draft under legal review. The final version will be published soon.",
  },
  localeSuggestion: {
    detected: "It looks like you prefer Spanish.",
    viewIn: "View in Spanish",
    stayIn: "Continue in English",
  },
};

export function getDict(locale: Locale): Dict {
  return locale === "en" ? EN : ES;
}

export type { Dict };
