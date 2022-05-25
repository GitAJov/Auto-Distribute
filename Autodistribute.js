function distribute(){
  let input = document.getElementById("start").value;
  let separator = document.getElementById("separate").value;
  let inputInArray = input.split(separator);

  //check if the input is only made up of numbers.
  if(inputInArray.every(checkNum)==false){
    return;
  }
  function checkNum(num){
    return /^\d+$/.test(num);
  }
  //sort the list of numbers
  inputInArray.sort(function(a, b){return a - b});
  document.getElementById("sorted").value += String(inputInArray);

  //formula to make table
  let range = parseInt(inputInArray[inputInArray.length-1])-parseInt(inputInArray[0]);
  document.getElementById("range").value += " " + String(range);

  let kelas = Math.round(1 + (3.3* Math.log10(inputInArray.length)));
  document.getElementById("class").value += " " + String(kelas);

  let panjang = Math.round(range/kelas);
  document.getElementById("length").value += " " + String(panjang);

  let start = parseInt(inputInArray[0]);
  let condition = [];
  //make the range of numbers (19-24, 25-30, 31-36 etc.)
  while(start<=parseInt(inputInArray[inputInArray.length-1])){
      condition.push(start);
      start += (panjang-1);
      condition.push(start);
      start += 1;
  }

  let table = document.getElementsByTagName("tbody")[0];
  let tableRowIndex = 0;

  //function to create table cells
  function maketd(value){
    let td = document.createElement('td');
    td.setAttribute("width", "50%");
    let centeredText = document.createElement('center');
    centeredText.innerText = value;
    td.appendChild(centeredText);
    document.getElementsByTagName("tr")[tableRowIndex].appendChild(td)
  }

  //function to create table rows
  function maketr(){
    let tr = document.createElement('tr');
    table.appendChild(tr)
    tableRowIndex++;
    console.log(tableRowIndex)
  }

  let index=0;
  let frekuensi = 0;
  for(i=0; i<inputInArray.length;){
    //count frequency of numbers in a particular range.
    if(parseInt(inputInArray[i])>=condition[index] && parseInt(inputInArray[i])<=condition[index+1]){
      frekuensi++;
      i++;
    }
    else{
    //go to the next range of numbers.
      maketr()
      maketd(String(condition[index]) + "~" + String(condition[index+1]));
      maketd(String(frekuensi))
      console.log(String(condition[index]) + "~" + String(condition[index+1]) + "=" + String(frekuensi));
      frekuensi = 0;
      index += 2; // change current condition (19-23 turned to 24-28)
    }
  }
  maketr()
  maketd(String(condition[index]) + "~" + String(condition[index+1]));
  maketd(String(frekuensi))
}
