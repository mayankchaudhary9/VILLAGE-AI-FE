import React from "react";
import Header from "../components/Header";
import CardSection from "../components/CardSection";
import { useOutletContext } from "react-router-dom";

export default function CardPage({ type }) {
  const { t, language, setLanguage } = useOutletContext();
  const dataMap = {
    farming: [
      {
        title: t.point_Farming1,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRQB38vtk6PvFax9gLwPPgf6-oBbaFIb7cmA&s",
        description: t.desc_Farming1,
        youtube: "https://youtu.be/_tijHjup-gM?si=tpAdtHX7i4rb0Ujv",
      },
      {
        title: t.point_Farming2,
        image:
          "https://blog.dhigroup.com/wp-content/uploads/2021/02/AdobeStock_303823739.jpeg",
        description: t.desc_Farming2,
        youtube: "https://youtu.be/_tijHjup-gM?si=tpAdtHX7i4rb0Ujv",
      },
      {
        title: t.point_Farming3,
        image: "https://tropogo.com/blogs/images/blog/bg_spraying.png",
        description: t.desc_Farming3,
        youtube: "https://youtu.be/_tijHjup-gM?si=tpAdtHX7i4rb0Ujv",
      },
    ],
    dairy: [
      {
        title: t.point_Dairy1,
        image:
          "https://dac.digital/wp-content/uploads/2024/05/cover_cows_1200x680-optimized.png",
        description: t.desc_Dairy1,
        youtube: "https://youtu.be/BQUBgenXbm4?si=AmOtDegbhhX__9mA",
      },
      {
        title: t.point_Dairy2,
        image:
          "https://www.dsm-firmenich.com/anh/news/feed-talks/articles/how-diet-optimization-can-improve-cost-efficiency-in-dairy.thumb.800.480.png",
        description: t.desc_Dairy2,
        youtube: "https://youtu.be/BQUBgenXbm4?si=AmOtDegbhhX__9mA",
      },
      {
        title: t.point_Dairy3,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxUgh05VrL-bpOA9b5a1ZIBPndvnGVH7uy4A&s",
        description: t.desc_Dairy3,
        youtube: "https://youtu.be/BQUBgenXbm4?si=AmOtDegbhhX__9mA",
      },
    ],
    education: [
      {
        title: t.point_Education1,
        image:
          "https://images.forbesindia.com/blog/wp-content/uploads//media/images/2025/Aug/img_247140_untitled.jpg",
        description: t.desc_Education1,
        youtube: "https://youtu.be/NzutTAAVzVY?si=GII4x_W22HGTlMdT",
      },
      {
        title: t.point_Education2,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkp-CSxxC9eWRTCrqAc3oCNdMvCpXdv5ZFYA&s",
        description: t.desc_Education2,
        youtube: "https://youtu.be/NzutTAAVzVY?si=GII4x_W22HGTlMdT",
      },
      {
        title: t.point_Education3,
        image:
          "https://articles.unesco.org/sites/default/files/2024-05/use-ai-education-deciding-future-we-want.jpg",
        description: t.desc_Education3,
        youtube: "https://youtu.be/NzutTAAVzVY?si=GII4x_W22HGTlMdT",
      },
    ],
    health: [
      {
        title: t.point_health1,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuniTJnJgA-mFl5hh7y4mSj1OWXNsyR-rZfUWgNFjkJmmBrzPxG4h-Sl2g7ZJBH0DqFVE&usqp=CAU",
        description: t.desc_health1,
        youtube: "https://youtu.be/Wf8mTmPdK8c?si=LIMf7fKiiOxriQGl",
      },
      {
        title: t.point_health2,
        image:
          "https://medicalbuyer.co.in/wp-content/uploads/2023/06/How-remote-patient-tracking-system-for-hospital-beds-is-transforming-healthcare.jpg",
        description: t.desc_health2,
        youtube: "https://youtu.be/Wf8mTmPdK8c?si=LIMf7fKiiOxriQGl",
      },
      {
        title: t.point_health3,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA2wfNb5LWNkmxT7vYaX6d_xKtR1Ac3fPiGHGyzfjPMyoELU2g3I-5iC_05rdvcnLEYp0&usqp=CAU",
        description: t.desc_health3,
        youtube: "https://youtu.be/Wf8mTmPdK8c?si=LIMf7fKiiOxriQGl",
      },
    ],
    solar: [
      {
        title: t.point_solarEnergy1,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgMzOd78Glh7OBBsXHaOF9UeSry200cpPwpg&s",
        description: t.desc_solarEnergy1,
        youtube: "https://youtu.be/P_HNYhv-Y3A?si=oLtiI-LvvZfF22Pv",
      },
      {
        title: t.point_solarEnergy2,
        image:
          "https://media.licdn.com/dms/image/v2/D4E12AQFlhIhslplL8Q/article-cover_image-shrink_720_1280/B4EZhNAHDAGUAI-/0/1753638532901?e=2147483647&v=beta&t=c1vHcsc9vvLjL17o1zXNoYk56v80MCArelmfK_URRyc",
        description: t.desc_solarEnergy2,
        youtube: "https://youtu.be/P_HNYhv-Y3A?si=oLtiI-LvvZfF22Pv",
      },
      // {
      //   title: t.point_solarEnergy3,
      //   image:
      //     "https://articles.unesco.org/sites/default/files/2024-05/use-ai-education-deciding-future-we-want.jpg",
      //   description:
      //     t.desc_solarEnergy3,
      // },
    ],
    water: [
      {
        title: t.point_waterManagement1,
        image:
          "https://media.licdn.com/dms/image/v2/D4E12AQEtvL6SdA99qQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1730818608251?e=2147483647&v=beta&t=Vr89mhWrwHNqo67ra8AGSNy87WeChKExVyTVo5LGZgo",
        description: t.desc_waterManagement1,
        youtube: "https://youtube.com/shorts/tF-nBxTpCBA?si=RZRmiIvptSn__0od",
      },
      {
        title: t.point_waterManagement2,
        image:
          "https://img.freepik.com/premium-photo/automated-irrigation-system-with-sensors-adjusting-water-distribution-based-realtime-weather-soil-data-concept-smart-irrigation-sensor-technology-realtime-data-water-efficiency_864588-58333.jpg",
        description: t.desc_waterManagement2,
        youtube: "https://youtube.com/shorts/tF-nBxTpCBA?si=RZRmiIvptSn__0od",
      },
      // {
      //   title: t.point_waterManagement3,
      //   image:
      //     "https://articles.unesco.org/sites/default/files/2024-05/use-ai-education-deciding-future-we-want.jpg",
      //   description:
      //     t.desc_waterManagement3,
      // },
    ],
  };

  const data = dataMap[type] || [];
  const titleMap = {
    farming: "AI in Farming 🌾",
    dairy: "AI in Dairy Farming 🐄",
    education: "AI in Education 🎓",
    health: "AI in Health 🏥",
    solar: "AI in Solar Energy ☀️",
    water: "AI in Water Management 💧",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header t={t} language={language} setLanguage={setLanguage} />
      <CardSection
        t={t}
        language={language}
        setLanguage={setLanguage}
        title={titleMap[type]}
        data={data}
      />
    </div>
  );
}
