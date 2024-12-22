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
  },
  fr: {
    translation: {
      'submit.title': 'Lancez Votre Prochain Grand Projet 🚀',
      'submit.subtitle': 'Rejoignez des milliers de jeunes entrepreneurs qui ont réalisé leurs idées !',
      'submit.idea.label': 'Quelle est votre grande idée ? 💡',
      'submit.idea.placeholder': 'ex., Uber pour la promenade de chiens',
      'submit.description.label': 'Parlez-nous en plus ✨',
      'submit.description.placeholder': 'Quel problème résout-il ? Comment ça marche ?',
      'submit.market.label': 'Marché Cible 🎯',
      'submit.market.placeholder': 'Qui sont vos clients potentiels ?',
      'submit.team.label': 'Expérience de l\'Équipe 👥',
      'submit.team.placeholder': 'Parlez-nous des compétences de votre équipe',
      'submit.email.label': 'Email de Contact 📧',
      'submit.email.placeholder': 'vous@exemple.com',
      'submit.button': 'Soumettre Mon Idée',
      'stats.startups': 'Startups Lancées',
      'stats.founders': 'Fondateurs Actifs',
      'stats.funding': 'Financement Obtenu',
    }
  },
  de: {
    translation: {
      'submit.title': 'Starten Sie Ihr Nächstes Großes Projekt 🚀',
      'submit.subtitle': 'Schließen Sie sich Tausenden junger Unternehmer an, die ihre Ideen verwirklicht haben!',
      'submit.idea.label': 'Was ist Ihre große Idee? 💡',
      'submit.idea.placeholder': 'z.B., Uber für Gassi-Service',
      'submit.description.label': 'Erzählen Sie uns mehr darüber ✨',
      'submit.description.placeholder': 'Welches Problem löst es? Wie funktioniert es?',
      'submit.market.label': 'Zielmarkt 🎯',
      'submit.market.placeholder': 'Wer sind Ihre potenziellen Kunden?',
      'submit.team.label': 'Team-Hintergrund 👥',
      'submit.team.placeholder': 'Erzählen Sie uns von den Fähigkeiten Ihres Teams',
      'submit.email.label': 'Kontakt-E-Mail 📧',
      'submit.email.placeholder': 'sie@beispiel.com',
      'submit.button': 'Idee Einreichen',
      'stats.startups': 'Gestartete Startups',
      'stats.founders': 'Aktive Gründer',
      'stats.funding': 'Erhaltene Finanzierung',
    }
  },
  zh: {
    translation: {
      'submit.title': '启动您的下一个伟大项目 🚀',
      'submit.subtitle': '加入数千名将想法变为现实的年轻企业家！',
      'submit.idea.label': '您的好点子是什么？💡',
      'submit.idea.placeholder': '例如：宠物遛狗优步服务',
      'submit.description.label': '告诉我们更多详情 ✨',
      'submit.description.placeholder': '它解决什么问题？如何运作？',
      'submit.market.label': '目标市场 🎯',
      'submit.market.placeholder': '谁是您的潜在客户？',
      'submit.team.label': '团队背景 👥',
      'submit.team.placeholder': '告诉我们您团队的技能',
      'submit.email.label': '联系邮箱 📧',
      'submit.email.placeholder': '您的邮箱@示例.com',
      'submit.button': '提交您的想法',
      'stats.startups': '已启动的创业公司',
      'stats.founders': '活跃创始人',
      'stats.funding': '筹集资金',
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