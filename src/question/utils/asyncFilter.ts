const asyncFilter = <DataType, FilterType>(
	data: DataType[],
	key: string,
	param: FilterType
): Promise<DataType[]> => {
	return new Promise((res, rej) => {
		if (!data.some(x => typeof (x as any)[key] != 'undefined')) {
			rej(`The property "${key}" doesn't exist on object`);
		}
		res(data.filter((x: DataType) => (x as any)[key] == param));
	});
};

export default asyncFilter;
