const mergeArrays = <T = any>(
	mainArray: any[],
	toMergeArray: T[],
	key: string
): Promise<T[]> => {
	return new Promise(res => {
		res(
			mainArray.map(
				mainData =>
					toMergeArray.find(
						toMergeData => (mainData as any)[key] == (toMergeData as any)[key]
					) || mainData
			) as T[]
		);
	});
};

export default mergeArrays;
