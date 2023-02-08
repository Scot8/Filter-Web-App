let table = document.querySelector('table tbody');
let dataCount = document.querySelector('#dataCount');
let pageNumber = 0;
let one = 1;

let take = 5;
let addTake = 0;

let filterOne = "-- No Filter --";
let filterTwo = "-- No Filter --";

let clearFilterButton = document.querySelector('#clearFilter');   //clear filter button






function getData() {





    
    let url = ``;
    if (filterOne == "Cuisine")      //if the dropdown list is selected to the following filterone URL gets assigned
        url = `/cuisine/cuisine?secondFilter=${filterTwo}&page=${pageNumber}&take=${take}`;

    else if (filterOne == "City")
        url = `/cuisine/city?secondFilter=${filterTwo}&page=${pageNumber}&take=${take}`;

    else if (filterOne == "Country")
        url = `/cuisine/country?secondFilter=${filterTwo}&page=${pageNumber}&take=${take}`;

    else
        url = `/restaurants?page=${pageNumber}&take=${take}`;  //default url when page loads up!!

    fetch(url)                     //fetching the data
        .then(response => response.json())
        .then(data => {
            if (data[0] == 0) {
                one -= take;
                addTake -= take;

                pageNumber--;
                document.querySelector('#next').disabled = true;
            }
            else {
                table.innerHTML = "";
                for (let i = 0; i < data[0].length; i++) {
                    dataCount.innerHTML = `Displaying ${one} - ${data[0].length + addTake} of ${data[1].length}`;
                    table.innerHTML += `
                        <tr>
                            <td>${data[0][i].name}</td>
                            <td>${data[0][i].country}</td>
                            <td>${data[0][i].city}</td>
                            <td>${data[0][i].cuisine}</td>
                        </tr>
                    `;
                }
            }
        });
}

/*ONE, ADDTAKE ARE SUED TO DEFINE PAGE NUMBERS*/

window.addEventListener('load', event => { getData() });



document.querySelector("#previous").addEventListener("click", event => {      //PREVIOUS button HERE!!
    if (pageNumber == 0) 
        document.querySelector('#previous').disabled = true; //these are to Enable/disable the button 
    else {
        document.querySelector('#next').disabled = false;//these are to Enable/disable the button 
        one -= take;
        addTake -= take;
        pageNumber--;
        getData();
    }
});

document.querySelector("#next").addEventListener("click", event => {          ////NEXT button HERE!!
    document.querySelector('#previous').disabled = false;//these are to Enable/disable the button 
    one += take;
    addTake += take;
    pageNumber++;
    getData();
});

document.querySelector("#perPage").addEventListener("change", event => {//PER PAGE DROPDOWN HERE!!
    pageNumber = 0;

    let perPage = document.querySelector('#perPage option:checked').value;
    let actualP = parseInt(perPage);
    take = actualP;
    one = 1;
    addTake = 0;
    getData();
});

document.getElementById("send").addEventListener("click", event => {
    document.querySelector('#clearFilter').disabled = false; // enabling the clear button here

    let firstFilterList = document.getElementById("firstFilter");
    let selectedfirstFilterIndex = firstFilterList.value;
    filterOne = selectedfirstFilterIndex;
    let secondFilterList = document.getElementById("secondFilter");
    let selectedsecondFilterIndex = secondFilterList.value;
    filterTwo = selectedsecondFilterIndex;

if (firstFilterList.selectedIndex == 0 || secondFilterList.selectedIndex == 0)  //what if the user does not select the filter and click button AN ALERT is displayed
{
    alert("You must select a filter to filter! If you wish to clear, 'Click filter'");  
}


    document.querySelector('#next').disabled = false;
    document.querySelector('#previous').disabled = false;

    let perPage = document.querySelector('#perPage option:checked').value;


    
    one = 1;
    addTake = 0;
    pageNumber = 0;
    getData();
});


document.querySelector("#clearFilter").addEventListener("click", event => {//PER PAGE DROPDOWN HERE!!
    
    clearFilterButton = document.querySelector('#clearFilter');

    let firstList = document.getElementById("firstFilter");
    let secondList = document.getElementById("secondFilter");

if (firstList.selectedIndex == 0 && secondList.selectedIndex == 0)  //what if the user does not select the filter and click button AN ALERT is displayed
{
    document.querySelector('#clearFilter').disabled = true;
}
else
{
    document.querySelector('#clearFilter').disabled = false;
    location.href = 'http://localhost:3000/';
    


}


  
});



//-------------------------------------------------------------------------------------------eventlistner for dropdownList------------------------------------------------------------------------------------------------------//

let firstFilter = document.querySelector("#firstFilter");

firstFilter.addEventListener("change", event => {

    let firstFilterList = document.getElementById("secondFilter");

    if (firstFilter.selectedIndex == 2) {   //selecting the index
        firstFilterList.innerHTML = `<option value = ''>-- No Filter --</option>`;
        fetch("./city")
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    firstFilterList.innerHTML +=
                        `<option value="${data[i].city}">
                        ${data[i].city}
                    </option>`;
                }
            });
    }


    else if (firstFilter.selectedIndex == 1) {               
        firstFilterList.innerHTML = `<option value = ''>-- No Filter --</option>`;

        fetch("./country")   
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    firstFilterList.innerHTML +=
                        `<option value="${data[i].country}">
                        ${data[i].country}
                    </option>`;
                }
            });

    }
    else if (firstFilter.selectedIndex == 3) {
        firstFilterList.innerHTML = `<option value = ''>-- No Filter --</option>`;

        fetch("./cuisine")
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    firstFilterList.innerHTML +=
                        `<option value="${data[i].cuisine}">
                        ${data[i].cuisine}
                    </option>`;
                }
            });
    }
});