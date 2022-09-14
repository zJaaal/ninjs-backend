const mergeArrays = <T>(
	mainArray: any[],
	toMergeArray: T[],
	key: string
): Promise<T[]> => {
	return new Promise((res, rej) => {
		if (
			!mainArray.some(x => typeof (x as any)[key] != 'undefined') ||
			!toMergeArray.some(x => typeof (x as any)[key] != 'undefined')
		) {
			rej(`The property "${key}" should exist in the objects of both arrays`);
		}
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
