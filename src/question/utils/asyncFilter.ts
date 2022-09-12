const asyncFilter = <DataType, FilterType>(
	data: DataType[],
	key: string,
	param: FilterType
): Promise<DataType[]> => {
	return new Promise(res => {
		res(data.filter((x: DataType) => (x as any)[key] == param));
	});
};

export default asyncFilter;
