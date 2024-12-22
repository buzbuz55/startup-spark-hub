import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'submit.title': 'Launch Your Next Big Thing 🚀',
      'submit.subtitle': 'Join thousands of young entrepreneurs who turned their ideas into reality!',
      'submit.idea.label': "What's your big idea? 💡",
      'submit.idea.placeholder': 'e.g., Uber for Pet Walking',
      'submit.description.label': 'Tell us more about it ✨',
      'submit.description.placeholder': 'What problem does it solve? How does it work?',
      'submit.market.label': 'Target Market 🎯',
      'submit.market.placeholder': 'Who are your potential customers?',
      'submit.team.label': 'Team Background 👥',
      'submit.team.placeholder': "Tell us about your team's skills",
      'submit.email.label': 'Contact Email 📧',
      'submit.email.placeholder': 'you@example.com',
      'submit.button': 'Submit Your Idea',
      'stats.startups': 'Startups Launched',
      'stats.founders': 'Active Founders',
      'stats.funding': 'Funding Raised',
    }
  },
  es: {
    translation: {
      'submit.title': 'Lanza Tu Próximo Gran Proyecto 🚀',
      'submit.subtitle': '¡Únete a miles de jóvenes emprendedores que hicieron realidad sus ideas!',
      'submit.idea.label': '¿Cuál es tu gran idea? 💡',
      'submit.idea.placeholder': 'ej., Uber para pasear mascotas',
      'submit.description.label': 'Cuéntanos más sobre ella ✨',
      'submit.description.placeholder': '¿Qué problema resuelve? ¿Cómo funciona?',
      'submit.market.label': 'Mercado Objetivo 🎯',
      'submit.market.placeholder': '¿Quiénes son tus clientes potenciales?',
      'submit.team.label': 'Experiencia del Equipo 👥',
      'submit.team.placeholder': 'Cuéntanos sobre las habilidades de tu equipo',
      'submit.email.label': 'Email de Contacto 📧',
      'submit.email.placeholder': 'tu@ejemplo.com',
      'submit.button': 'Enviar Mi Idea',
      'stats.startups': 'Startups Lanzadas',
      'stats.founders': 'Fundadores Activos',
      'stats.funding': 'Financiación Conseguida',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;