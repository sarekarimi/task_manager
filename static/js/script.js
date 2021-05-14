$(".checked").prop("checked", true)
$('input[name="checkbox"]:checked').parents(".row").css("background-color", "#CCFFCC");


var checkbox = document.querySelectorAll("input[name=checkbox]");
for (var i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("change", checkedOrNot);
}


$("#task-form").submit(function(e) {
    if ($("#task-form button").attr("id") == "submit") {
        e.preventDefault();
        var serializedData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: $("#submit").attr("data-url"),
            data: serializedData,
            success: function(response) {
                $("#task-form").trigger('reset');
                $("#id_title").focus();

                var instance = JSON.parse(response["instance"]);
                var fields = instance[0]["fields"];

                var newRow = `<tr class="row">
                <td class="px-6 py-4 whitespace-nowrap text-center">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <label class="inline-flex items-center mt-3">
                                <input id="unchecked" class="unchecked" type="checkbox" name="checkbox" data-url="{% url 'selected-task' task.pk %}" class="form-checkbox h-5 w-5 text-green-600" >
                            </label>                                       
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${fields["title"]||""}</div>
                    <div class="text-sm text-gray-500">
                        ${fields["description"]||""}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex item-center justify-left">
                        <a id="update" href="#">
                            <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                        </a>
                        <a id="delete" href="#">
                            <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </td>
            </tr>
                `

                $("#my_tasks tbody").prepend(
                    $(newRow)
                )

                var urlunchecked = $("tbody").attr("data-unchecked")
                var urlu = $("#submit").attr("data-urlu")
                var urld = $("#submit").attr("data-urld")
                $("#update").attr("href", urlu.replace('2', instance[0]["pk"]))
                $("#delete").attr("href", urld.replace('3', instance[0]["pk"]))
                $("#unchecked").attr("data-url", urlunchecked.replace('4', instance[0]["pk"]))
                $("#unchecked").prop("checked", false);

            },
            error: function(response) {
                alert(response["responseJSON"]["error"]);
            }
        })
    } else {
        return;
    }

})


$(document).on("change", "#unchecked", function(e) {
    // checkedOrNot(e,#unchecked)
    if ($(this).prop('checked')) {
        var data = $(this).attr("data-url");
        $(this).parents(".row").css("background-color", "#CCFFCC");
        $(this).prop("checked", true)
        e.preventDefault();
        var serializedData = $(this).serialize();
        $.ajax({
            dataType: 'json',
            url: $(this).attr("data-url"),
            data: serializedData,
        })
        $(this).attr("data-url", data.replace('selected', 'unselected'));
    } else {
        var data = $(this).attr("data-url");
        $(this).parents(".row").css("background-color", "#FFFFFF");
        $(this).prop("checked", false);
        e.preventDefault();
        var serializedData = $(this).serialize();
        $.ajax({
            dataType: 'json',
            url: $(this).attr("data-url"),
            data: serializedData,
        })
        $(this).attr("data-url", data.replace('unselected', 'selected'));
    }
});




function checkedOrNot(e) {
    $("#unchecked").prop("checked", true);
    if ($(this).prop('checked')) {
        var data = $(this).attr("data-url");
        $(this).parents(".row").css("background-color", "#CCFFCC");
        $(this).prop("checked", true)
        e.preventDefault();
        var serializedData = $(this).serialize();
        $.ajax({
            dataType: 'json',
            url: $(this).attr("data-url"),
            data: serializedData,
        })
        $(this).attr("data-url", data.replace('selected', 'unselected'));
    } else {
        var data = $(this).attr("data-url");
        $(this).parents(".row").css("background-color", "#FFFFFF");
        $(this).prop("checked", false);
        e.preventDefault();
        var serializedData = $(this).serialize();
        $.ajax({
            dataType: 'json',
            url: $(this).attr("data-url"),
            data: serializedData,
        })
        $(this).attr("data-url", data.replace('unselected', 'selected'));
    }
}