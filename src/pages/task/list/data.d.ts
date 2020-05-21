export interface TaskDetailDataType {
  id: number;
  groupId: number;
  title: string;
  content: string;
  deadline: string;
  updatedAt: string;
  createdAt: string;
  usertask: {
    status: string;
    rate: number;
    submitContent: string;
    teacherComment: string;
    updateAt: string;
    userId: number;
  }
}
