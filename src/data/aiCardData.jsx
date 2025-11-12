import { Sprout, Lightbulb, Milk } from "lucide-react";

export const getAICards = (t) => [
  {
    image: "https://img.freepik.com/free-photo/agricultural-robots-work-smart-farms_35913-3364.jpg?semt=ais_hybrid&w=740&q=80",
    title: t.farming,
    desc: t.farmingDesc,
    gradient: "from-blue-400 to-cyan-600",
    link: "/farming",
  },
  {
    image: "https://images.squarespace-cdn.com/content/v1/6560a729ac3ff440a8945dd0/456f1ed6-88e8-4c3f-98c2-e2ba286f0740/cellphone3.jpeg",
    title: t.dairy,
    desc: t.dairyDesc,
    gradient: "from-blue-400 to-cyan-600",
    link: "/dairy",
  },
  {
    image: "https://aicertswpcdn.blob.core.windows.net/newsportal/2025/08/freepik__the-style-is-candid-image-photography-with-natural__38728-1.png",
    title: t.education,
    desc: t.educationDesc,
    gradient: "from-blue-400 to-cyan-600",
    link: "/education",
  },
  {
    image: "https://media.easy-peasy.ai/27feb2bb-aeb4-4a83-9fb6-8f3f2a15885e/5d8c291b-add5-44d4-a689-cd5baaa359f5.png",
    title: t.health,
    desc: t.healthDesc,
    gradient: "from-blue-400 to-cyan-600",
    link: "/health",
  },
  {
    image: "https://static.vecteezy.com/system/resources/thumbnails/040/560/751/small/ai-generated-village-huts-with-solar-panels-free-photo.jpg",
    title: t.solarEnergy,
    desc: t.solarEnergyDesc,
    gradient: "from-blue-400 to-cyan-600",
    link: "/solar",
  },
  {
    image: "https://itmunch.com/wp-content/uploads/2024/07/Smart-irrigation-system.jpg",
    title: t.waterManagement,
    desc: t.waterManagementDesc,
    gradient: "from-blue-400 to-cyan-600",
    link: "/water",
  },
];