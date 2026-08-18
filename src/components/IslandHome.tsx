import {
  Button,
  Card,
  Cursor,
  Divider,
  Footer,
  Icon,
  Tag,
  Title,
  type IconName,
  type TagColor,
} from "animal-island-ui"
import { useEffect, useState } from "react"
import type { ComponentProps, CSSProperties } from "react"

import { config } from "@/lib/config"
import styles from "./IslandHome.module.css"

interface ProjectTheme {
  icon: IconName
  pattern: Exclude<NonNullable<ComponentProps<typeof Card>["pattern"]>, "none">
  tagColor: TagColor
  tag: string
}

const projectThemes: ProjectTheme[] = [
  {
    icon: "icon-map",
    pattern: "app-teal",
    tagColor: "app-teal",
    tag: "HOME",
  },
  {
    icon: "icon-miles",
    pattern: "purple",
    tagColor: "purple",
    tag: "AI LAB",
  },
  {
    icon: "icon-diy",
    pattern: "app-yellow",
    tagColor: "app-yellow",
    tag: "TOOLBOX",
  },
  {
    icon: "icon-design",
    pattern: "app-teal",
    tagColor: "app-teal",
    tag: "CHAT",
  },
]

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer")
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

const chineseWeekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]

function IslandClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const update = () => setNow(new Date())
    update()
    const timer = window.setInterval(update, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const hour = now ? now.getHours().toString().padStart(2, "0") : "--"
  const minute = now ? now.getMinutes().toString().padStart(2, "0") : "--"
  const monthday = now ? `${now.getMonth() + 1}月${now.getDate()}日` : ""
  const weekday = now ? chineseWeekdays[now.getDay()] : ""

  return (
    <div className={styles.clock} aria-label="当前时间">
      <div className={styles.clockDate}>
        <span className={styles.clockWeekday}>{weekday}</span>
        <span className={styles.clockMonthday}>{monthday}</span>
      </div>
      <div className={styles.clockTime}>
        {hour}
        <span className={styles.clockColon}>:</span>
        {minute}
      </div>
    </div>
  )
}

export default function IslandHome() {
  useEffect(() => {
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-island-reveal]")
    )
    const reveal = (item: HTMLElement) => {
      item.dataset.islandRevealed = "true"
    }

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(reveal)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          reveal(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px 35% 0px",
      }
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <Cursor forceAll={false}>
      <div className={styles.page}>
        <div className={styles.sky} id="top">
          <div className={`${styles.cloud} ${styles.cloudOne}`} aria-hidden />
          <div className={`${styles.cloud} ${styles.cloudTwo}`} aria-hidden />
          <div className={`${styles.cloud} ${styles.cloudThree}`} aria-hidden />

          <header className={styles.header}>
            <a className={styles.brand} href="#top" aria-label="返回主页顶部">
              <span className={styles.brandIcon}>
                <img
                  className={styles.brandSailboat}
                  src="/sailboat.svg"
                  alt=""
                  aria-hidden="true"
                />
              </span>
              <span>
                <strong>xiao-baii</strong>
                <small>PERSONAL ISLAND</small>
              </span>
            </a>

            <nav className={styles.navigation} aria-label="主页导航">
              <span className={styles.sectionNavigation}>
                <Button
                  type="text"
                  size="small"
                  onClick={() => scrollToSection("projects")}
                >
                  项目
                </Button>
              </span>
              <Button
                type="default"
                size="small"
                icon={<Icon name="icon-helicopter" size={22} />}
                onClick={() => openExternal(config.github)}
              >
                GitHub
              </Button>
            </nav>
          </header>

          <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.heroCopy}>
              <h1 id="hero-title" className={styles.heroTitle}>
                <span>你好，我是</span>
                <strong>xiao-baii</strong>
              </h1>
              <div className={styles.heroRibbon}>
                <Title size="middle" color="app-teal">
                  欢迎来到我的小岛
                </Title>
              </div>
              <div className={styles.heroActions}>
                <Button
                  type="primary"
                  size="large"
                  icon={<Icon name="icon-helicopter" size={28} bounce />}
                  onClick={() => openExternal(config.github)}
                >
                  前往 GitHub
                </Button>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.timePanel}>
                <IslandClock />
              </div>
              <span className={`${styles.leafDot} ${styles.leafDotOne}`} />
              <span className={`${styles.leafDot} ${styles.leafDotTwo}`} />
              <span className={`${styles.leafDot} ${styles.leafDotThree}`} />
            </div>
          </section>

          <div className={styles.skyCurve} aria-hidden />
        </div>

        <main className={styles.land}>
          <div className={styles.contentShell}>
            <section
              className={styles.section}
              id="projects"
              aria-labelledby="projects-title"
            >
              <div
                className={`${styles.sectionHeading} ${styles.revealItem}`}
                data-island-reveal
              >
                <h2 id="projects-title">
                  <Title size="large" color="app-yellow">
                    我的项目岛
                  </Title>
                </h2>
              </div>

              <div className={styles.projectGrid}>
                {config.projects.map((project, index) => {
                  const theme = projectThemes[index % projectThemes.length]
                  const isExternal = project.link.startsWith("http")

                  return (
                    <a
                      key={project.name}
                      className={`${styles.cardLink} ${styles.revealItem}`}
                      href={project.link}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      aria-label={`访问项目 ${project.name}`}
                      data-island-reveal
                      style={
                        {
                          "--reveal-delay": `${(index % 2) * 70}ms`,
                        } as CSSProperties
                      }
                    >
                      <Card
                        pattern={theme.pattern}
                        hoverable
                        className={styles.projectCard}
                      >
                        <div className={styles.projectCardBody}>
                          <div className={styles.projectTopline}>
                            <span className={styles.projectIcon}>
                              <Icon name={theme.icon} size={54} bounce />
                            </span>
                          </div>
                          <div>
                            <h3>{project.name}</h3>
                            <p>{project.desc}</p>
                          </div>
                          <div className={styles.projectMeta}>
                            <Tag
                              color={theme.tagColor}
                              variant="solid"
                              size="small"
                            >
                              {theme.tag}
                            </Tag>
                            <span>打开项目</span>
                          </div>
                        </div>
                      </Card>
                    </a>
                  )
                })}
              </div>
            </section>

            <Divider type="wave-yellow" />
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerCopy}>
            <div className={styles.footerBrand}>
              <strong>xiao-baii · Personal Island</strong>
              <span>Built with Astro and animal-island-ui.</span>
            </div>
            <a
              className={styles.beianLink}
              href={config.beian.link}
              target="_blank"
              rel="noreferrer"
            >
              {config.beian.number}
            </a>
          </div>
          <div className={styles.seaViewport} aria-hidden>
            <Footer type="sea" seamless className={styles.footerWave} />
          </div>
        </footer>
      </div>
    </Cursor>
  )
}
