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
    title: "사랑하는 엄마의 영광스러운 퇴임식 🤍",
    description: "30년의 열정과 헌신, 유영선 여사님의 은퇴를 축하합니다.",
    ogImage: "/images/gallery/intro_1.png",
    noIndex: true,
    _jwk_watermark_id: uniqueIdentifier,
  },
  main: {
    title: "❤️축 퇴 직❤️",
    image: "/images/gallery/image001.jpg",
    date: "2026년 5월 31일 일요일",
    venue: "행복 가득한 우리 집"
  },
  intro: {
    title: "새로운 시작",
    text: "한평생 가족과 일터를 위해\n쉼 없이 달려오신\n유영선 여사님의 아름다운 마침표.\n\n더 찬란하게 빛날\n엄마의 두 번째 서막을\n우리 온 가족이 응원합니다."
  },
  date: {
    year: 2026,
    month: 5,
    day: 31,
    hour: 11,
    minute: 0,
    displayDate: "2026.05.31 SUN AM 11:00",
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
      "/images/gallery/image1.jpg",
      "/images/gallery/image2.jpg",
      "/images/gallery/image3.jpg",
    ],
  } as GalleryConfig,
  invitation: {
    message: "Dear. 사랑하는 엄마에게\n\n엄마라는 이름으로, 그리고 멋진 직업인으로\n한평생 책임을 다해오신 모습을 존경합니다.\n\n엄마가 흘린 소중한 땀방울이 있었기에\n지금의 우리 가족이 있을 수 있었습니다.\n\n이제 일터에서의 무거운 짐은 모두 내려놓고,\n더 자유롭고 행복하게 빛날 엄마의 미래를\n마음을 다해 응원합니다.\n\n그동안 정말 고생 많으셨어요.\n사랑하고, 존경합니다. 🤍",
    groom: {
      name: "유영선",
      label: "여사님",
      father: "",
      mother: "",
    },
    bride: {
      name: "가족일동",
      label: "올림",
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