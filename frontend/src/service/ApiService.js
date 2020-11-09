import { defaultResponseObject, RES_STATUS, createPersonInfoList, createPersonFilesList } from 'utils';
import { getUserData, getUserFiles, uploadFile, deleteFile, editFile, uploadAvatar, getUserAvatar } from 'api';

export default class {
	constructor(onError) {
		this.onError = onError;
  }

  handleNewAvatar = async (userName, event, cb, successCb) => {
		if (!event.target.files.length) {
	    cb(RES_STATUS.OK);
	    return;
	  }
	  const file = event.target.files[0];
	  cb(RES_STATUS.LOADING);
	  try {
	    const res = await uploadAvatar(userName, file);
	    cb(RES_STATUS.OK);
	    successCb();
	  } catch (error) {
	    cb(RES_STATUS.ERROR);
	    this.onError('Avatar upload error');
	  }
  };

  handleFileUpload = async (userName, event, cb, successCb) => {
	  if (!event.target.files.length) {
	    cb(RES_STATUS.OK);
	    return;
	  }
	  const file = event.target.files[0];
	  cb(RES_STATUS.LOADING);
	  try {
	    const res = await uploadFile(userName, file);
	    cb(RES_STATUS.OK);
	    successCb();
	  } catch (error) {
	    cb(RES_STATUS.ERROR);
	    this.onError('File upload error');
	  }
	};


	handleEditFile = async (fileId, fileName, files, cb) => {
	  try {
	    await editFile(fileId, fileName);
	    cb({
	       ...defaultResponseObject(),
	      data: files.data.map((file) => file.id === fileId ? {...file, name: fileName } : file), 
	      status: RES_STATUS.OK
	    });
	  } catch (error) {
	     cb({
	       ...defaultResponseObject(), 
	      data: files, 
	      status: RES_STATUS.ERROR
	    });
	     this.onError(error);
	  }
	};

  handleDeleteFile = async (fileId, files, cb) => {
	  try {
	    await deleteFile(fileId);
	    cb({
	       ...defaultResponseObject(),
	      data: files.data.filter((file) => file.id !== fileId), 
	      status: RES_STATUS.OK
	    });
	  } catch (error) {
	    cb({
	       ...defaultResponseObject(), 
	      data: files, 
	      status: RES_STATUS.ERROR
	    });
      this.onError(error);
	  }
	}

	fetchUserData = async (userName, cb) => {
	  try {
	   	const res = await getUserData(userName);
	    cb({ 
	      ...defaultResponseObject(), 
	      data: createPersonInfoList(res.data), 
	      status: res.status
	    });
	  } catch (error) {
	    cb({ status: RES_STATUS.ERROR });
	    this.onError(error);
	  }
	}


	fetchUserFiles = async (userName, cb) => {
	  try {
	    const res = await getUserFiles(userName);
	    cb({ 
	      ...defaultResponseObject(), 
	      data: createPersonFilesList(res.data), 
	      status: res.status
	    });
	  } catch (error) {
	    cb({ status: RES_STATUS.ERROR });
	    this.onError(error);
	  }
	}


	fetchUserAvatar = async (userName, cb) => {
		try {
	    const res = await getUserAvatar(userName);
	    cb({ 
	      ...defaultResponseObject(), 
	      data: res.data, 
	      status: res.status
	    });
	  } catch (error) {
	    cb({ status: RES_STATUS.ERROR });
	    this.onError(error);
	  }
	}
}