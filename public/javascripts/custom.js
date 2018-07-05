//CREATE TABLE ROW
var createObjTable = (tableData) => {
    //CLEAR PREVIOUS TABLE
    $("#dataBody").empty();

    // CREATE TABLE
    $.each(tableData.blocks, function (key, obj) {

        var msec = parseInt(obj.timeStamp, 16)
        var d = new Date(msec)
        var t = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours()+ ':' + d.getMinutes() + ':' + d.getSeconds() 
        $("#dataBody").append(
            '<tr>' +
            '<td><a class="filterLink" href="/api/data/'+parseInt(obj.blockNumber, 16) + '">' + parseInt(obj.transactionHash, 16) + '</a></td> ' +
            '<td>'+ parseInt(obj.blockNumber, 16) +'</td>' +
            '<td>'+ t +'</td>' +
            '<td>'+ parseInt(obj.gasPrice, 16) +'</td>' +
            '<td>'+ parseInt(obj.gasUsed, 16) +'</td>' +
            '</tr>'
        );
    });
};

// Load Data from data.json file
var loadData = () => {
    $.ajax({
        type: "GET",
        url: "/api/data/",
        dataType: 'json',
        beforeSend: function () {
            $('#dataBody').html('Loading...')
        },
        success: function(res){
            // console.log(res);
            createObjTable(res);
        },
        error: function () {
            console.log("Request Failed.");
        }

    });
}

$(function(){
    $('#loadBtn').hide();

    $(document).on('click', '.filterLink', function(e){
        $.ajax({
            type: "GET",
            url: $(this).attr('href'),
            dataType: 'json',
            beforeSend: function () {
                $('#dataBody').html('Loading...')
            },
            // async: false,
            success: function(res){
                // console.log(res);
                createObjTable(res);
                $('#loadBtn').show();
            },
            error: function () {
                // toastr.error("Request Failed. Please try again!", {timeOut: 5000});
                console.log("Request Failed.");
            }
    
        });
        return false;
    });

    $(document).on('click', '#loadBtn', function(e){
        loadData();
        $('#loadBtn').hide();
    });

    $(document).on('click', '.sorter', function(e){
        const prop = $(this).attr('prop');
        const url = $(this).attr('href') + '&order_by='+ prop;

        if(prop == 'asc'){
            $(this).attr('prop', 'desc');
        } else if(prop == 'desc'){
            $(this).attr('prop', 'asc');
        }

        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            beforeSend: function () {
                $('#dataBody').html('Loading...')
            },
            // async: false,
            success: function(res){
                // console.log(res);
                createObjTable(res);
                $('#loadBtn').hide();
            },
            error: function () {
                // toastr.error("Request Failed. Please try again!", {timeOut: 5000});
                console.log("Request Failed.");
            }
    
        });
        return false;
    });
})