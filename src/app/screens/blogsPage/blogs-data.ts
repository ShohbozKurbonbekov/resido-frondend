import type { BlogType } from "@/lib/type/blogs";

export const blogs: BlogType[] = [
  {
    date: "2025-08-23",
    id: 1,
    image: "/img/p-10.jpg",
    tags: ["Luxury", "Seoul", "Investment"],
    title: "Top 5 Tips for Buying a Luxury Apartment in Seoul",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    quote:
      "“Owning a home is a keystone of wealth… both financial affluence and emotional security.” – Suze Orman",
    comments: [
      {
        id: 1,
        name: "Jinwoo Park",
        avatar: "/images/comments/jinwoo.jpg",
        date: "2025-08-20",
        text: "Great insights! I especially liked the point about researching the neighborhood before making a decision.",
      },
      {
        id: 2,
        name: "Sophia Kim",
        avatar: "/images/comments/sophia.jpg",
        date: "2025-08-22",
        text: "Very helpful article. I’m currently looking for an apartment in Gangnam and these tips will guide me a lot.",
      },
      {
        id: 3,
        name: "David Lee",
        avatar: "/images/comments/david.jpg",
        date: "2025-08-23",
        text: "Could you also write about the legal side of buying property as a foreigner?",
      },
      {
        id: 4,
        name: "Minji Choi",
        avatar: "/images/comments/minji.jpg",
        date: "2025-08-25",
        text: "Loved this! Please share more content about the interior design trends in Seoul apartments.",
      },
    ],
    writer: {
      name: "Alex Johnson",
      bio: "Alex is a real estate consultant with over 10 years of experience helping clients buy and sell properties in South Korea. He specializes in luxury apartments and investment strategies.",
      avatar: "/images/authors/alex-johnson.jpg",
      social: {
        facebook: "https://facebook.com/alexjohnson",
        twitter: "https://twitter.com/alexjohnson",
        instagram: "https://instagram.com/alexjohnson",
        youtube: "https://youtube.com/@alexjohnson",
        linkedin: "https://linkedin.com/in/alexjohnson",
      },
    },
  },
  {
    date: "2025-07-12",
    tags: ["Foreigners", "Taxes", "Legal"],
    id: 2,
    image: "/img/p-11.jpg",
    title: "Guide for Foreigners Investing in Seoul Real Estate",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    quote:
      "“Don’t wait to buy real estate. Buy real estate and wait.” – Will Rogers",
    comments: [
      {
        id: 1,
        name: "Emily Carter",
        avatar: "/images/comments/emily.jpg",
        date: "2025-07-12",
        text: "This clarified a lot of my questions about foreign ownership laws. Thank you!",
      },
      {
        id: 2,
        name: "Hiro Tanaka",
        avatar: "/images/comments/hiro.jpg",
        date: "2025-07-14",
        text: "Could you make a comparison between Seoul and Tokyo’s real estate investment rules?",
      },
      {
        id: 3,
        name: "Soojin Park",
        avatar: "/images/comments/soojin.jpg",
        date: "2025-07-16",
        text: "Super helpful article, especially the tax section. Keep it up!",
      },
      {
        id: 4,
        name: "Michael Brown",
        avatar: "/images/comments/michael.jpg",
        date: "2025-07-18",
        text: "I didn’t know about the restrictions in certain areas. This saved me time.",
      },
    ],
    writer: {
      name: "Grace Lee",
      bio: "Grace is a financial advisor focusing on property investment in Asia. She helps international clients enter the Korean market safely and profitably.",
      avatar: "/images/authors/grace-lee.jpg",
      social: {
        facebook: "https://facebook.com/gracelee",
        twitter: "https://twitter.com/gracelee",
        instagram: "https://instagram.com/gracelee",
        youtube: "https://youtube.com/@gracelee",
        linkedin: "https://linkedin.com/in/gracelee",
      },
    },
  },
  {
    date: "2025-06-10",
    id: 3,
    tags: ["Staging", "Design", "Sales"],
    image: "/img/p-12.jpg",
    title: "The Power of Home Staging: Selling Faster in Korea",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    quote:
      "“First impressions are everything in real estate.” – Barbara Corcoran",
    comments: [
      {
        id: 1,
        name: "Hannah Kim",
        avatar: "/images/comments/hannah.jpg",
        date: "2025-06-10",
        text: "I staged my home before selling and it really made a difference. Great article!",
      },
      {
        id: 2,
        name: "James Lee",
        avatar: "/images/comments/james.jpg",
        date: "2025-06-11",
        text: "Love the tip about neutral colors. Buyers want to imagine their own style.",
      },
      {
        id: 3,
        name: "Rachel Park",
        avatar: "/images/comments/rachel.jpg",
        date: "2025-06-12",
        text: "Could you share some recommended staging companies in Seoul?",
      },
      {
        id: 4,
        name: "Daniel Choi",
        avatar: "/images/comments/daniel.jpg",
        date: "2025-06-13",
        text: "Never thought lighting mattered this much. I’ll definitely use these tricks.",
      },
    ],
    writer: {
      name: "David Kim",
      bio: "David is an interior designer turned real estate blogger. He specializes in creating beautiful spaces that sell quickly in Korea’s fast-paced housing market.",
      avatar: "/images/authors/david-kim.jpg",
      social: {
        facebook: "https://facebook.com/davidkim",
        twitter: "https://twitter.com/davidkim",
        instagram: "https://instagram.com/davidkim",
        youtube: "https://youtube.com/@davidkim",
        linkedin: "https://linkedin.com/in/davidkim",
      },
    },
  },
  {
    date: "2025-05-05",
    id: 4,
    tags: ["Rental", "Jeonse", "Wolse"],
    image: "/img/p-13.jpg",
    title: "Understanding Korea’s Rental Market: Jeonse vs Wolse",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    quote:
      "“An investment in knowledge pays the best interest.” – Benjamin Franklin",
    comments: [
      {
        id: 1,
        name: "Oliver Smith",
        avatar: "/images/comments/oliver.jpg",
        date: "2025-05-05",
        text: "Finally, a clear explanation of Jeonse vs Wolse. I was so confused before!",
      },
      {
        id: 2,
        name: "Yuna Lee",
        avatar: "/images/comments/yuna.jpg",
        date: "2025-05-06",
        text: "Good breakdown. I think Jeonse makes sense for long-term stability.",
      },
      {
        id: 3,
        name: "Chris Evans",
        avatar: "/images/comments/chris.jpg",
        date: "2025-05-07",
        text: "Wolse works better for me as an expat, since I don’t want to tie up too much money.",
      },
      {
        id: 4,
        name: "Mina Cho",
        avatar: "/images/comments/mina.jpg",
        date: "2025-05-08",
        text: "Would love an article about how Jeonse contracts are changing in 2025.",
      },
    ],
    writer: {
      name: "Sungmin Oh",
      bio: "Sungmin is a property lawyer in Seoul who writes about rental laws and housing contracts. His articles simplify legal jargon for everyday readers.",
      avatar: "/images/authors/sungmin-oh.jpg",
      social: {
        facebook: "https://facebook.com/sungminoh",
        twitter: "https://twitter.com/sungminoh",
        instagram: "https://instagram.com/sungminoh",
        youtube: "https://youtube.com/@sungminoh",
        linkedin: "https://linkedin.com/in/sungminoh",
      },
    },
  },
  {
    date: "2025-04-01",
    id: 5,
    tags: ["Eco", "SmartHomes", "Sustainability"], // NEW
    image: "/img/p-14.jpg",
    title: "Eco-Friendly Homes: The Future of Korean Real Estate",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    quote: "“The future will be green, or not at all.” – Jonathon Porritt",
    comments: [
      {
        id: 1,
        name: "Isabella Lee",
        avatar: "/images/comments/isabella.jpg",
        date: "2025-04-01",
        text: "Smart homes are the way to go! Excited to see more eco options in Korea.",
      },
      {
        id: 2,
        name: "Kevin Park",
        avatar: "/images/comments/kevin.jpg",
        date: "2025-04-02",
        text: "I installed solar panels last year and saved a lot on bills. Good read!",
      },
      {
        id: 3,
        name: "Sophia Wang",
        avatar: "/images/comments/sophiaw.jpg",
        date: "2025-04-03",
        text: "Can you also cover eco-friendly financing options? That would be great.",
      },
      {
        id: 4,
        name: "Jason Kim",
        avatar: "/images/comments/jason.jpg",
        date: "2025-04-04",
        text: "Loved this article. Green real estate should be the standard.",
      },
    ],
    writer: {
      name: "Hyejin Kim",
      bio: "Hyejin is a sustainability advocate and architect. She writes about eco-friendly housing and the future of smart living in Korea.",
      avatar: "/images/authors/hyejin-kim.jpg",
      social: {
        facebook: "https://facebook.com/hyejinkim",
        twitter: "https://twitter.com/hyejinkim",
        instagram: "https://instagram.com/hyejinkim",
        youtube: "https://youtube.com/@hyejinkim",
        linkedin: "https://linkedin.com/in/hyejinkim",
      },
    },
  },
  {
    date: "2025-03-10",
    id: 6,
    tags: ["Trends", "Market", "Seoul"],
    image: "/img/p-15.jpg",
    title: "Seoul Real Estate Market Trends 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    quote:
      "“In the real estate business, you learn more about people, and you learn more about community issues.” – Johnny Isakson",
    comments: [
      {
        id: 1,
        name: "Daniel Lee",
        avatar: "/images/comments/daniel.jpg",
        date: "2025-03-10",
        text: "Thanks for the stats! The rise in Gangnam prices is crazy.",
      },
      {
        id: 2,
        name: "Clara Kim",
        avatar: "/images/comments/clara.jpg",
        date: "2025-03-11",
        text: "Would love to see more visual graphs in the next report.",
      },
      {
        id: 3,
        name: "Noah Smith",
        avatar: "/images/comments/noah.jpg",
        date: "2025-03-12",
        text: "Interesting read, but I think the suburbs are becoming more attractive too.",
      },
      {
        id: 4,
        name: "Jisoo Park",
        avatar: "/images/comments/jisoo.jpg",
        date: "2025-03-13",
        text: "Great breakdown, especially the section on rental demand.",
      },
    ],
    writer: {
      name: "Michael Han",
      bio: "Michael is a real estate analyst based in Seoul. He provides data-driven insights into housing trends and market shifts.",
      avatar: "/images/authors/michael-han.jpg",
      social: {
        facebook: "https://facebook.com/michaelhan",
        twitter: "https://twitter.com/michaelhan",
        instagram: "https://instagram.com/michaelhan",
        youtube: "https://youtube.com/@michaelhan",
        linkedin: "https://linkedin.com/in/michaelhan",
      },
    },
  },
];
