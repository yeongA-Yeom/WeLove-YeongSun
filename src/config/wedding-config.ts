const uniqueIdentifier = "JWK-WEDDING-TEMPLATE-V1";

type GalleryLayout = "scroll" | "grid";
type GalleryPosition = "middle" | "bottom";

interface GalleryConfig {
  layout: GalleryLayout;
  position: GalleryPosition;
  images: string[];
}

export const weddingConfig = {
  meta: {
    title: "🤍사랑하는 엄마의 (우리만의) 영광스러운 퇴임식🤍",
    description: "열정과 헌신, 유영선 여사님의 은퇴를 축하합니다.",
    ogImage: "/images/intro_1.png",
    noIndex: true,
    _jwk_watermark_id: uniqueIdentifier,
  },
  main: {
    title: "✨ ️퇴직축하합니다 ✨",
    image: "/images/gallery/image001.jpg",
    date: "2026년 5월 31일 일요일",
    venue: "사랑하는 엄마의 인생 2막 시작을 응원해요♡"
  },
  intro: {
    title: "새로운 시작",
    text: "한평생 가족과 일터를 위해\n쉼 없이 달려오신\n유영선 여사님의 아름다운 마침표.\n\n더 찬란하게 빛날\n엄마의 두 번째 서막을\n우리 온 가족이 응원합니다."
  },
  date: {
    year: 2026,
    month: 5,
    day: 31,
    hour: 12,
    minute: 30,
    displayDate: "2026.05.31 SUN",
  },
  venue: {
    name: "행복 가득한 우리 집",
    address: "가족 모임 장소",
    tel: "010-1234-5678",
    naverMapId: "장소명",
    coordinates: {
      latitude: 37.5665,
      longitude: 126.9780,
    },
    placeId: "123456789",
    mapZoom: "17",
    mapNaverCoordinates: "14141300,4507203,15,0,0,0,dh",
    transportation: {
      subway: "오시는 길 안내",
      bus: "버스 안내",
    },
    parking: "주차 가능",
    groomShuttle: { location: "", departureTime: "", contact: { name: "", tel: "" } },
    brideShuttle: { location: "", departureTime: "", contact: { name: "", tel: "" } }
  },
  gallery: {
    layout: "grid" as GalleryLayout,
    position: "middle" as GalleryPosition,
    images: [
      "/images/gallery/20220828_151410_IMG_6570.jpg",
      "/images/gallery/image001.jpg",
      "/images/gallery/b-05.jpg",
      "/images/gallery/20240420_123704.jpg",
      "/images/gallery/20240702_103738.jpg",
      "/images/gallery/20240701_120033.jpg"
    ],
  } as GalleryConfig,
  invitation: {
    message: `사랑하는 우리 엄마❤️

엄마, 긴 시간 동안 정말 고생 많으셨어요.
엄마의 퇴직을 진심으로 축하드려요.

엄마는 늘 우리에게 부족한 엄마라며 미안하다고 했지만
우리에게 엄마는 누구보다 멋있고 든든하고 아름답고 소중한 사람이에요.

가족을 위해 누구보다 열심히 살아오신 시간들,
힘든 순간에도 묵묵히 견뎌내신 마음들을
이제는 우리도 조금씩 알 것 같아요.
그래서 더 존경스럽고 더 감사한 마음뿐이에요.

엄마 덕분에 우린 늘 따뜻한 사랑 안에서 웃을 수 있었고,
지금의 행복한 가족이 있을 수 있었어요.
엄마가 흘리신 땀과 노력, 그리고 사랑은
우리에게 평생 가장 큰 선물이에요.

이제는 그동안의 무거운 짐 조금 내려놓으시고,
앞으로는 엄마 자신을 더 많이 아끼고 사랑하시면서
엄마가 하고 싶었던 것들 마음껏 하며 지내셨으면 좋겠어요.

그동안 정말 많이 고생하셨어요.
그리고 우리 엄마여서 정말 감사합니다.
많이 사랑하고, 누구보다 존경합니다 🤍
`,    groom: {
      name: "",
      label: "",
      father: "",
      mother: "",
    },
    bride: {
      name: "",
      label: "",
      father: "",
      mother: "",
    },
  },
  account: {
    groom: { bank: "은행명", number: "계좌번호", holder: "유영선" },
    bride: { bank: "", number: "", holder: "" },
    groomFather: { bank: "", number: "", holder: "" },
    groomMother: { bank: "", number: "", holder: "" },
    brideFather: { bank: "", number: "", holder: "" },
    brideMother: { bank: "", number: "" , holder: ""}
  },
  rsvp: {
    enabled: false,
    showMealOption: false,
  },
  slack: {
    webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "",
    channel: "#wedding-response",
    compactMessage: true,
  },
};