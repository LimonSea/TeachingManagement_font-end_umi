export interface TaskDetailDataType {
  id?: number;
  groupId?: number;
  title?: string;
  content?: string;
  deadline?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface UserDataType {
  id?: number;
  name?: string;
  avatar?: string;
  usertask?: UserTaskDataType;
}

export interface UserTaskDataType {
  status: string;
  rate: number;
  studentContent: string;
  teacherContent: string;
  updateAt: string;
}
