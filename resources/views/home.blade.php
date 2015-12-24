<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>home</title>
        <script src="https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
        <meta name="_token" content="{{ csrf_token() }}"/>
    </head>
    <body>
        <textarea id="main" name="name" rows="8" cols="40">
        </textarea>
        <button id="set" type="button" name="button">SAVE</button>
        <div class="hel" style="background:#ddd;">

        </div>
        <textarea id="sel" name="name" rows="8" cols="40"></textarea>

        @yield('main_content')
    </body>
    <script type="text/javascript">
        $(function(){

            $("#set").click(function(event) {
                var txt = $("#main").val();
                $.ajax({
                    url: 'home',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        'data': txt ,
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    },
                })
                .done(function(re) {
                    $(".hel").html(re);
                    $("#sel").html(re);
                })
                .fail(function() {
                    console.log("error");
                });
            });

        })
    </script>
</html>
