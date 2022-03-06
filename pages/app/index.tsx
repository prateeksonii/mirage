import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend";
import Head from "next/head";
import Link from "next/link";

const AppIndex = () => {
  return (
    <>
      <Head>
        <title>App - Mirage</title>
      </Head>
      <nav>
        <Link passHref href="/api/auth/logout">
          <a>Logout</a>
        </Link>
      </nav>
      <div>AppIndex</div>
    </>
  );
};

export default withPageAuthRequired(AppIndex);
