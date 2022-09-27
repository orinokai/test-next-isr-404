import React from "react";
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://toqqtvqopcjiklnztuiz.supabase.co",
  process.env.SUPABASE_KEY
);

const Page = ({ page }) => {
  return (
    <>
      <h1>{page?.title}</h1>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { data } = await supabase.from("state").select();

  // return 404
  if (data[0].status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page: {
        title: Math.random(),
      },
    },
    revalidate: 60,
  };
}

export default Page;
