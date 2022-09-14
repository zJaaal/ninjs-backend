const asyncPagination = <T>(data: T[], page: number): Promise<T[]> => {
	return new Promise(res => {
		res(data.splice((Number(page) - 1) * 10, 10) as T[]);
	});
};

export default asyncPagination;
