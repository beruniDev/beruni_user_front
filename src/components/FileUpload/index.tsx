import { ChangeEvent, FC, useState } from "react";
import { useAppDispatch } from "src/store/utils/types";
import { addImage } from "src/store/reducers/imageUpload";

export interface FileItem {
  file: File;
  id: number | string;
}
interface FileUploaderProps {
  // onFilesSelected: (formData: FileItem[]) => void;
  inputRef?: any;
  tableHead?: string;
  name: string | number;
}

const UploadComponent: FC<FileUploaderProps> = ({
  // onFilesSelected,
  name,
  inputRef,
  tableHead,
}) => {
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [fileIdCounter, setFileIdCounter] = useState(0);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const updatedFileList: FileItem[] = [...fileList];
      for (let i = 0; i < files.length; i++) {
        const newFileItem: FileItem = {
          file: files[i],
          id: fileIdCounter + i,
        };
        updatedFileList.push(newFileItem);
      }
      // onFilesSelected(updatedFileList);
      dispatch(addImage({ files: updatedFileList, name }));
      setFileList(updatedFileList);
      setFileIdCounter(fileIdCounter + files.length);
    }
  };

  const handleFileDelete = (id: number | string) => {
    const updatedFileList = fileList.filter((item) => item.id !== id);
    setFileList(updatedFileList);
    // onFilesSelected(updatedFileList);
  };

  return (
    <div>
      <input
        className="form-control"
        id="fileUploader"
        type="file"
        ref={inputRef}
        multiple
        onChange={handleFileUpload}
      />

      {/* {!!fileList?.length && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th className={cl(styles.tableHead, tableHead)}>
                Загруженные файлы
              </th>
              <th className={cl(styles.tableHead, tableHead)} />
            </tr>
          </thead>

          <tbody>
            {fileList.map((item) => (
              <tr className="bg-blue" key={item.id}>
                <td>{item.file.name}</td>
                <td width={50}>
                  <div
                    className="d-flex justify-content-center pointer"
                    onClick={() => handleFileDelete(item.id)}
                  >
                    <img src="/assets/icons/delete.svg" alt="delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
};

export default UploadComponent;
