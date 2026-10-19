interface Config {
  github: string
  beian: { number: string; link: string }
}

export const config: Config = {
  github: "https://github.com/xiao-baii",
  beian: {
    number: "鄂ICP备2026025888号-1",
    link: "https://beian.miit.gov.cn/",
  },
}
