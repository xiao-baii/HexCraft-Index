interface Project {
  name: string
  desc: string
  link: string
}

interface Config {
  github: string
  beian: { number: string; link: string }
  projects: Project[]
}

export const config: Config = {
  github: "https://github.com/xiao-baii",
  beian: {
    number: "鄂ICP备2026025888号-1",
    link: "https://beian.miit.gov.cn/",
  },
  projects: [
    {
      name: "主页",
      desc: "个人主页与小岛入口，记录正在做的项目与工具。",
      link: "/",
    },
  ],
}
