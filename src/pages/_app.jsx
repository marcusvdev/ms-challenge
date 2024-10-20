import Layout from "../templates/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Layout>
                <Component {...pageProps} className="pt-8" />
            </Layout>
        </>
    );
}

export default MyApp;
