import xlsx from "xlsx";

// 提供方法，暴露出去
export function readSutdentsFile(file) {
  console.log("a");
  // 对异步进行封装 (成功, )
  return new Promise(resolve => {
    console.log("b");

    let students = [];
    let reader = new FileReader();
    // 按二进制字符串读出
    reader.readAsBinaryString(file);
    // 执行后执行回调函数
    reader.onload = event => {
      let data = event.target.result;
      // 基于什么读，整个文档读到workbook中
      let workbook = xlsx.read(data, { type: "binary" });
      // 拿到页
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      // 转换成以行为单位，便于操作
      let s = xlsx.utils.sheet_to_row_object_array(sheet);
      s.forEach(r => {
        let number = parseInt(r.__EMPTY);
        if (!isNaN(parseInt(r.__EMPTY))) {
          let student = {
            number: r.__EMPTY,
            name: r.__EMPTY_1,
            score: r.__EMPTY_9
          };
          students.push(student);
        }
      });
      console.log(students.length);
      console.log(students);
    };
    // 异步执行完成时执行
    reader.onloadend = () => {
      console.log("c");

      // 通知已执行完成，并且返回值
      resolve(students);
    };
  });
}
