import React from "react";
import {
  Button,
  Card,
  CardContent,
  Icon,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AlgorithmsList from "components/algorithmsList";
import LanguagesList from "components/languagesList";
import { getAlgorithm } from "lib/algorithms";
import Section from "components/section";
import CategoriesList from "components/categoriesList";
import { Language, Repositories } from "lib/repositories";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GithubOriginalIcon from "react-devicons/github/original";
import GitterPlainIcon from "react-devicons/gitter/plain";
import WeblatePlainIcon from "react-devicons/weblate/plain";
import {
  Search,
  Sort,
  OfflineBolt,
  EnhancedEncryption,
  Storage,
  Functions,
  InsertPhoto,
} from "@material-ui/icons";
import Translation from "components/translation";
import useTranslation from "hooks/translation";
import Head from "components/head";
import getRepositoryStars from "lib/stars";
import { Algorithm } from "lib/models";
import classes from "./index.module.css";

export default function Home({
  topAlgorithms,
  featuredAlgorithms,
  stars,
}: {
  topAlgorithms: Algorithm[];
  featuredAlgorithms: Algorithm[];
  stars: { [key: string]: number };
}) {
  const t = useTranslation();

  return (
    <>
      <Head description={t("indexMetaDescription")} />
      <Section title={t("topAlgorithms")}>
        <AlgorithmsList noCategories algorithms={topAlgorithms} />
      </Section>
      <div>
        <Section>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.twoCols}>
                <div>
                  <Typography id="about" variant="h5" className={classes.title}>
                    {t("algorithmExplanationTitle")}
                  </Typography>
                  <Typography>{t("algorithmExplanation")}</Typography>
                </div>
                <div />
                <div>
                  <Typography
                    id="aboutUs"
                    variant="h5"
                    className={classes.title}
                  >
                    {t("aboutUsTitle")}
                  </Typography>
                  <Typography>{t("aboutUs")}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
      </div>
      <Section title={t("featuredAlgorithms")}>
        <AlgorithmsList noCategories algorithms={featuredAlgorithms} />
      </Section>
      <Section title={t("topCategories")}>
        <CategoriesList
          categories={[
            {
              name: t("categories:sorts"),
              icon: <Sort />,
              href: "/category/sorts",
            },
            {
              name: t("categories:searches"),
              icon: <Search />,
              href: "/category/searches",
            },
            {
              name: t("categories:dynamicprogramming"),
              icon: <OfflineBolt />,
              href: "/category/dynamicprogramming",
            },
            {
              name: t("categories:ciphers"),
              icon: <EnhancedEncryption />,
              href: "/category/ciphers",
            },
            {
              name: t("categories:datastructures"),
              icon: <Storage />,
              href: "/category/datastructures",
            },
            {
              name: t("categories:math"),
              icon: <Functions />,
              href: "/category/math",
            },
            {
              name: t("categories:digitalimageprocessing"),
              icon: <InsertPhoto />,
              href: "/category/digitalimageprocessing",
            },
          ]}
        />
      </Section>

      <div>
        <Section>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.twoCols}>
                <div>
                  <Typography
                    id="programmingLanguages"
                    variant="h5"
                    className={classes.title}
                  >
                    {t("programmingLanguagesTitle")}
                  </Typography>
                  <Typography>{t("programmingLanguages")}</Typography>
                  <LanguagesList
                    languages={Object.keys(Repositories).map(
                      (langName: Language) => ({
                        name: langName,
                        href: `/language/${langName}`,
                        stars: stars[langName],
                      })
                    )}
                    sortable
                  />
                </div>
                <div />
                <div>
                  <Typography
                    id="contribute"
                    variant="h5"
                    className={classes.title}
                  >
                    {t("contributeTitle")}
                  </Typography>
                  <div className="MuiTypography-root MuiTypography-body1">
                    <Translation
                      name="contribute"
                      links={[
                        "https://hosted.weblate.org/engage/TheAlgorithms/?utm_source=widget",
                      ]}
                    />
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      className={classes.github}
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GithubOriginalIcon color="white" />
                      GitHub
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.weblate}
                      href="https://hosted.weblate.org/engage/TheAlgorithms/?utm_source=widget"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <WeblatePlainIcon color="black" />
                      Weblate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
        <Section className={classes.social}>
          <Typography variant="h4" className={classes.socialTitle}>
            {t("socialTitle")}
          </Typography>
          <div className={classes.socialButtons}>
            <Tooltip title={t("socialGithub")}>
              <Card>
                <IconButton
                  href=""
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("socialGithub")}
                >
                  <Icon style={{ fontSize: "1em" }}>
                    <GithubOriginalIcon color="" />
                  </Icon>
                </IconButton>
              </Card>
            </Tooltip>
            <Tooltip title="Twitter">
              <Card>
                <IconButton
                  href="https://twitter.com/The_Algorithms"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("Twitter")}
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#03a9f4"
                      d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
          c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
          c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
          c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
          c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
          c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
          C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
          C480.224,136.96,497.728,118.496,512,97.248z"
                    />
                  </svg>
                </IconButton>
              </Card>
            </Tooltip>
            <Tooltip title={t("socialGitter")}>
              <Card>
                <IconButton
                  href="https://gitter.im/TheAlgorithms/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("socialGitter")}
                >
                  <Icon style={{ fontSize: "1em" }}>
                    <GitterPlainIcon color="" />
                  </Icon>
                </IconButton>
              </Card>
            </Tooltip>
            <Tooltip title={t("socialDiscord")}>
              <Card>
                <IconButton
                  href="https://discord.gg/c7MnfGFGa6"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("socialDiscord")}
                >
                  <svg
                    width="71"
                    height="80"
                    viewBox="0 0 71 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M60.1045 13.8978C55.5792 11.8214 50.7265 10.2916 45.6527 9.41542C45.5603 9.39851 45.468 9.44077 45.4204 9.52529C44.7963 10.6353 44.105 12.0834 43.6209 13.2216C38.1637 12.4046 32.7345 12.4046 27.3892 13.2216C26.905 12.0581 26.1886 10.6353 25.5617 9.52529C25.5141 9.44359 25.4218 9.40133 25.3294 9.41542C20.2584 10.2888 15.4057 11.8186 10.8776 13.8978C10.8384 13.9147 10.8048 13.9429 10.7825 13.9795C1.57795 27.7309 -0.943561 41.1443 0.293408 54.3914C0.299005 54.4562 0.335386 54.5182 0.385761 54.5576C6.45866 59.0174 12.3413 61.7249 18.1147 63.5195C18.2071 63.5477 18.305 63.5139 18.3638 63.4378C19.7295 61.5728 20.9469 59.6063 21.9907 57.5383C22.0523 57.4172 21.9935 57.2735 21.8676 57.2256C19.9366 56.4931 18.0979 55.6 16.3292 54.5858C16.1893 54.5041 16.1781 54.304 16.3068 54.2082C16.679 53.9293 17.0513 53.6391 17.4067 53.3461C17.471 53.2926 17.5606 53.2813 17.6362 53.3151C29.2558 58.6202 41.8354 58.6202 53.3179 53.3151C53.3935 53.2785 53.4831 53.2898 53.5502 53.3433C53.9057 53.6363 54.2779 53.9293 54.6529 54.2082C54.7816 54.304 54.7732 54.5041 54.6333 54.5858C52.8646 55.6197 51.0259 56.4931 49.0921 57.2228C48.9662 57.2707 48.9102 57.4172 48.9718 57.5383C50.038 59.6034 51.2554 61.5699 52.5959 63.435C52.6519 63.5139 52.7526 63.5477 52.845 63.5195C58.6464 61.7249 64.529 59.0174 70.6019 54.5576C70.6551 54.5182 70.6887 54.459 70.6943 54.3942C72.1747 39.0791 68.2147 25.7757 60.1968 13.9823C60.1772 13.9429 60.1437 13.9147 60.1045 13.8978ZM23.7259 46.3253C20.2276 46.3253 17.3451 43.1136 17.3451 39.1693C17.3451 35.225 20.1717 32.0133 23.7259 32.0133C27.308 32.0133 30.1626 35.2532 30.1066 39.1693C30.1066 43.1136 27.28 46.3253 23.7259 46.3253ZM47.3178 46.3253C43.8196 46.3253 40.9371 43.1136 40.9371 39.1693C40.9371 35.225 43.7636 32.0133 47.3178 32.0133C50.9 32.0133 53.7545 35.2532 53.6986 39.1693C53.6986 43.1136 50.9 46.3253 47.3178 46.3253Z"
                      fill="#5865F2"
                    />
                  </svg>
                </IconButton>
              </Card>
            </Tooltip>
          </div>
        </Section>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const stars = await getRepositoryStars();
  return {
    props: {
      topAlgorithms: [
        await getAlgorithm("binary-search", true),
        await getAlgorithm("quick-sort", true),
        await getAlgorithm("fibonacci-numbers", true),
      ],
      featuredAlgorithms: [
        await getAlgorithm("coin-change", true),
        await getAlgorithm("logistic-regression", true),
        await getAlgorithm("caesar-cipher", true),
        await getAlgorithm("a-simple-gan", true),
        await getAlgorithm("bellman-ford", true),
        await getAlgorithm("bogo-sort", true),
      ],
      ...(await serverSideTranslations(locale, ["common", "categories"])),
      stars,
    },
  };
}
