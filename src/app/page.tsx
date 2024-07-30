import { HeroSection } from "@/components/ui/custom/HeroSection";
import { flattenAttributes } from "@/lib/utils";
import qs from "qs";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"]
        },
        link: {
          populate: true
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  console.log(url.href)

  try {
    const response = await fetch(url.href, { cache: 'no-store' });
    const data = await response.json();

    const flattenedData = flattenAttributes(data);
    console.dir(flattenedData, { dept: null }); // complete consolle of data

    return flattenedData;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.log(strapiData, 'here')

  const { title, description, blocks } = strapiData;

  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>

  );
}