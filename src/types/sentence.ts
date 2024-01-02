export type ISentence = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	content: String;
	source: String;
	languageId: String;
	isDeleted: Boolean;
};


export type ISentenceCreateInput = {
	content: String;
	source: String;
	languageId: String;

}