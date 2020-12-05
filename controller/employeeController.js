const readline = require('readline');
const fs = require('fs');

exports.findHighestPaidEmployee = function (request, response) {
    try {
        // read file content Filename:employeeData.txt
        const fileContent = readline.createInterface({
            input: fs.createReadStream('employeeData.txt'),
            output: process.stdout,
            terminal: false
        });
        var employeeArray = [];
        var outputArray = [];
        fileContent.on('line', (line) => {
            // create array of objects
            let splitArray = line.split(",");
            employeeArray.push({
                'empId': splitArray[0],
                'empName': splitArray[1],
                'empDept': splitArray[2],
                'empSalary': splitArray[3]
            })
        });
        // After completion of file reading (EOF) perform operation on data
        fileContent.on('close', () => {
            //get uniq departments
            let departments = [...new Set(employeeArray.map(d => d.empDept))]

            // for each department get department wise objects filtered and sort them by empId
            departments.forEach(function (deptEle) {
                let filteredDept = employeeArray.filter(function (filterEle) {
                    return filterEle.empDept == deptEle
                });
                var sortedEmp = filteredDept.sort((ele1, ele2) => Number(ele2.empId) - Number(ele1.empId));
                outputArray.push({
                    'dept': sortedEmp[0].empDept,
                    'salary': sortedEmp[0].empSalary
                })
            })
            //create output stream
            var stream = fs.createWriteStream("output.txt");
            stream.once('open', function (fd) {
                outputArray.forEach(function (element) {
                    //write data to output.txt file
                    stream.write(element.dept + ": " + element.salary + "\n");
                })
                stream.end();
            });
            response.json({
                status: 0,
                message: 'Data written. Please check output.txt file.'
            })
        })

    } catch (exception) {
        console.log(exception)
        response.json({
            status: 1,
            message: 'Exception occured'
        })
    }
}