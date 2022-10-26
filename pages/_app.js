import React from "react";
import "../styles/globals.css";

// const ComponentWithPageLayout =
// 	AppProps &
// 	{
// 		Component:
// 			AppProps["Component"] &
// 			{
// 				PageLayout,
// 			},
// 	};

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
	// return (
	// 	<div>
	// 		{Component.PageLayout ? (
	// 			<Component.PageLayout>
	// 				<Component {...pageProps} />
	// 			</Component.PageLayout>
	// 		) : (
	// 			<Component {...pageProps} />
	// 		)}
	// 	</div>
	// );
}

export default MyApp;
