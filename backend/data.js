import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Nace",
      email: "nace@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "tester1",
      email: "tester@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      //_id: "1",
      name: "Арин",
      slug: "gejmerski-stol-arin",
      category: "office",
      subCategory: "gaming-chair",
      image: "/products/arin_0.jpg",
      sideImage: "/products/arin__1.jpg",
      price: 4400,
      priceMontaza: 500,
      countInStock: 20,
      description:
        "Димензии:\n -L58 B58 H92-102 см.\nЛицев материјал:\n -еко кожа\nГрадба:\n -пластика\n -челик\n* амортизер на гас",
      dimension: "/products/arin_dp_0.jpg",
      scheme: "/products/arin_ap_0.jpg",
    },
    {
      //_id: "2",
      name: "Торин",
      slug: "gejmerski-stol-torin",
      category: "office",
      subCategory: "gaming-chair",
      image: "/products/torin_0.jpg",
      sideImage: "/products/torin_1.jpg",
      price: 6300,
      priceMontaza: 500,
      countInStock: 20,
      description:
        "Димензии:\n-  L63 B62 H108 / 115 см.\nТапацир:\n-лицев материјал, еко кожа\n-полнење: полиуретанска пена\n- ротација на 360 °\n- амортизер на гас\n-Механизам за лулкање Тилит со заклучување\nи прилагодување на силата на лулкање според тежината\n- тапацирани потпирачи за рака со функција\n- еластична и издржлива еко кожа со лесно одржување",
      dimension: "/products/thorin_dp.jpg",
      scheme: "/products/thorin_ap.jpg",
    },
  ],
};

export default data;
