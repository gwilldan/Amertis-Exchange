import { useState, useEffect } from "react";

const useFetchData = (url: string) => {
	const [data, setData] = useState(null);
	const [isloading, setisloading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		const fetchData = async () => {
			setisloading(true);
			try {
				const response = await fetch(url, { signal });
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const result = await response.json();
				setData(result);
			} catch (error: any) {
				if (error.name === "AbortError") {
					console.log("Request was cancelled");
				} else {
					setError(error.message);
				}
			} finally {
				setisloading(false);
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	}, [url]);

	return { data: (data as any)?.result, isloading, error };
};

export default useFetchData;
