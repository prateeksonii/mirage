import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend";
import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Link from "next/link";

const AppIndex = () => {
  const { user } = useUser();

  console.log(user);

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
