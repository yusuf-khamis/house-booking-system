var housesModule = angular.module('houses', ['ngRoute']);
var loggedIn = false;
var isCalled = false;
var selectedHouse = null;
var requestType = 'new';

housesModule.config(function ($routeProvider) {
    $routeProvider
            .when('/houses', {
                templateUrl: 'partials/houses.html',
                controller: 'HousesController'
            })
            .when('/info', {
                templateUrl: 'partials/info.html',
                controller: 'InformationController'
            })
            .when('/register', {
                templateUrl: 'partials/register.html',
                controller: 'RegistrationController'
            })
            .when('/admin', {
                templateUrl: 'partials/admin.html',
                controller: 'AdminController'
            })
            .when('/logout', {
                templateUrl: 'partials/logout.html',
                controller: 'LogoutController'
            })
            .otherwise({
                redirectTo: '/',
            });
});
housesModule.controller('MainController', ['$scope', function ($scope) {
        $('#feedback').hide();
        $('#form').prop('ng-disabled', 'true');
        redirect();
        
        var wheight = $(window).height();
        $('.fullheight').css('height', wheight);
        $('#featured .item img').each(function () {
            var imgsrc = $(this).attr('src');
            $(this).parent().css({'background-image': 'url(' + imgsrc + ')'});
            $(this).remove();
        });
        $(window).resize(function () {
            wheight = $(window).height();
            $('.fullheight').css('height', wheight);
        });
        
        //login box
        
        $('.login').submit(function () {
            var isFilled = true;
            $('.loginInput').each(function() {
                if($(this).val() === "")
                    isFilled = false;
            });
            var username = $('#username').val().trim();
            var password = $('#password').val().trim();
            if (!isFilled) {
                $('#alert').addClass('alert-danger fade in').html('Fields cannot be empty, please ensure that all fields are filled!').css('display', 'block');
            } else if (!username.match(/[0-9]+$/)) {
                $('#alert').addClass('alert-danger fade in').html('Your employee id should be numeric values only').css('display', 'block');
            } else {
                $.post('php/login.php', {username: username, password: password}, function (data) {
                    if (data == 3) {
                        $('#alert').addClass('alert-danger fade in').html('<strong>Error loging in!</strong> User does not exist, please try again.').css('display', 'block');
                        loggedIn = false;
                    } else if (data == 4) {
                        $('#alert').addClass('alert-danger fade in').html('<strong>Error loging in!</strong> Password incorrect, please retype your password and try again.').css('display', 'block');
                        loggedIn = false;
                    } else if (data == 1) {
                        $('#alert').addClass('alert-danger fade in').html('<strong>System malfunction!</strong> Please contact system administrator.').css('display', 'block');
                    } else if(data == 8) {
                        $('#alert').addClass('alert-danger fade in').html('<strong>Could not log you in!</strong> You are blocked, contact your admin.').css('display', 'block');
                    } else {
                        $('#alert').removeClass('alert-danger').addClass('alert-success fade in').html('<strong>Successful!</strong> You are now logged in').css('display', 'block');
                        setTimeout(function () {
                            $('#login').modal('hide');
                        }, 2000);
                        location.reload(true);
                    }
                });
            }
        });
    }]);

housesModule.controller('InformationController', ['$scope', function ($scope) {
        isCalled = false;
        var updatepwd = 'old'
        $.ajax({url: 'php/fetchInfo.php', async: false, cache: false, dataType: 'json'}).done(function (response) {
            $scope.info = response;
            if($scope.info.status == 'changing') {
                $('#tenant, #changing').removeClass('dissappear');
            } else {
                $('#' + $scope.info.status).removeClass('dissappear');
            }
            if($scope.info.status == 'tenant') {
                $('#request').html('Proceed to request a house change');
                requestType = $scope.info.house_number;
            } else if($scope.info.status == 'requesting') {
                $('#book').css('display', 'none');
                $('#surrender').css('display', 'none');
            } else {
                $('#surrender').css('display', 'none');
            }
        });
        $('#book').click(function () {
            isCalled = true;
            location.hash = '/houses';
        });
        var edit = false;
        $('.edit-input').children().focusout(function (event) {
            $(this).parent().css('display', 'none').prev('.field').removeClass('dissappear');
            $('input[name=pwd]').attr('placeholder', '(old password)').val('');
            updatepwd = 'old';
            
            event.stopImmediatePropagation();
            event.preventDefault();
        });
        var old, current;
        $('.edit-input').children().keyup(function (event) {
            var type;
            if(event.keyCode == 13 && event.altKey) {
                switch ($(this).attr('name')) {
                    case 'names':
                        type = 'names';
                        if(!$(this).val().trim().match(/^[A-Za-z]{4,20}[ ][A-Za-z]{4,20}[ ][A-Za-z]{4,20}$/)) {
                            $(this).addClass('edit-error');
                        } else {
                            $(this).removeClass('edit-error');
                            var names = $(this).val().trim().split(' ');
                            names[0] = names[0].substr(0, 1).toUpperCase() + names[0].substr(1).toLowerCase();
                            names[1] = names[1].substr(0, 1).toUpperCase() + names[1].substr(1).toLowerCase();
                            names[2] = names[2].substr(0, 1).toUpperCase() + names[2].substr(1).toLowerCase();
                            $.post('php/infoupdate.php', { names: names, field: type }, function (data) {
                                if(data == 0) {
                                    $('#feedback').html('Changes committed successfully').slideDown().delay(2000).slideUp();
                                    $('input[name=names]').parent().prev().html(names[0] + ' ' + names[1] + ' ' + names[2]).next().children().focusout();
                                    $('#header-name').html(names[0] + ' ' + names[2]);
                                    $('#user').html(names[0] + ' ' + names[2]);
                                } else {
                                    $('#feedback').html('Server error, please try again later').slideDown().delay(3000).slideUp();
                                }
                            });
                        }
                        break;
                    case 'id':
                        type = 'id';
                        if(!$(this).val().trim().match(/^[0-9]{7,8}$/)) {
                            $(this).addClass('edit-error');
                        } else {
                            $(this).removeClass('edit-error');
                            var id = $(this).val().trim();
                            $.post('php/infoupdate.php', { field: type, id: id }, function (data) {
                                if(data == 0) {
                                    $('#feedback').html('Changes committed successfully').slideDown().delay(2000).slideUp();
                                    $('input[name=id]').parent().prev().html(id).next().children().focusout();
                                } else {
                                    $('#feedback').html('Server error, please try again later').slideDown().delay(3000).slideUp();
                                }
                            });
                        }
                        break;
                    case 'pwd':
                        type = 'pwd';
                        if($(this).val().trim().match(/\s/) || $(this).val().trim().length < 6) {
                            $(this).addClass('edit-error');
                        } else {
                            $(this).removeClass('edit-error');
                            switch(updatepwd) {
                                case 'old':
                                    old = $('input[name=pwd]').val();
                                    $('input[name=pwd]').val('').attr('placeholder', '(new password)');
                                    updatepwd = 'new';
                                    break;
                                case 'new':
                                    current = $('input[name=pwd]').val();
                                    $('input[name=pwd]').val('').attr('placeholder', '(repeat password)');
                                    updatepwd = 'rpt';
                                    break;
                                case 'rpt':
                                    if($('input[name=pwd]').val() != current) {
                                        $('#feedback').html('Passwords do not match').slideDown().delay(3000).slideUp();
                                        $('input[name=pwd]').val('').attr('placeholder', '(new password)');
                                        updatepwd = 'new';
                                    } else {
                                        $.post('php/infoupdate.php', { field: type, current: current, old: old }, function (data) {
                                            if(data == 0) {
                                                $('#feedback').html('Password changed successfully').slideDown().delay(2000).slideUp();
                                            } else if(data == 4) {
                                                $('#feedback').html('Password incorrect, please try again').slideDown().delay(3000).slideUp();
                                            } else {
                                                $('#feedback').html('Server error, please try again later').slideDown().delay(3000).slideUp();
                                            }
                                        });
                                        $('input[name=pwd]').attr('placeholder', '(old password)').val('').focusout();
                                        updatepwd = 'old';
                                    }
                                    break;
                            }
                        }
                        break;
                    case 'box':
                        type = 'box';
                        if(!$(this).val().trim().match(/^[0-9]{3,10}$/)) {
                            $(this).addClass('edit-error');
                        } else {
                            $(this).removeClass('edit-error');
                            var box = $(this).val().trim();
                            $.post('php/infoupdate.php', { field: type, box: box }, function (data) {
                                if(data == 0) {
                                    $('#feedback').html('Changes committed successfully').slideDown().delay(2000).slideUp();
                                    $('input[name=box]').parent().prev().html(box).next().children().focusout();
                                } else {
                                    $('#feedback').html('Server error, please try again later').slideDown().delay(3000).slideUp();
                                }
                            });
                        }
                        break;
                    case 'postal':
                        type = 'postal';
                        if(!$(this).val().trim().match(/^[0-9]{3,10}$/)) {
                            $(this).addClass('edit-error');
                        } else {
                            $(this).removeClass('edit-error');
                            var postal = $(this).val().trim();
                            $.post('php/infoupdate.php', { field: type, postal: postal }, function (data) {
                                if(data == 0) {
                                    $('#feedback').html('Changes committed successfully').slideDown().delay(2000).slideUp();
                                    $('input[name=postal]').parent().prev().html(postal).next().children().focusout();
                                } else {
                                    $('#feedback').html('Server error, please try again later').slideDown().delay(3000).slideUp();
                                }
                            });
                        }
                        break;
                    case 'city':
                        type = 'city';
                        if(!$(this).val().trim().match(/^[A-Za-z]{4,30}$/)) {
                            $(this).addClass('edit-error');
                        } else {
                            $(this).removeClass('edit-error');
                            var city = $(this).val().trim().substr(0, 1).toUpperCase() + $(this).val().trim().substr(1).toLowerCase();
                            $.post('php/infoupdate.php', { field: type, city: city }, function (data) {
                                if(data == 0) {
                                    $('#feedback').html('Changes committed successfully').slideDown().delay(2000).slideUp();
                                    $('input[name=city]').parent().prev().html(city).next().children().focusout();
                                } else {
                                    $('#feedback').html('Server error, please try again later').slideDown().delay(3000).slideUp();
                                }
                            });
                        }
                        break;
                    case 'phone':
                        type = 'phone';
                        if(!$(this).val().trim().match(/^[0-9]{10}$/)) {
                            $(this).addClass('edit-error');
                        } else {
                            $(this).removeClass('edit-error');
                            var phone = $(this).val().trim();
                            $.post('php/infoupdate.php', { field: type, phone: phone }, function (data) {
                                if(data == 0) {
                                    $('#feedback').html('Changes committed successfully').slideDown().delay(2000).slideUp();
                                    $('input[name=phone]').parent().prev().html(phone).next().children().focusout();
                                } else {
                                    $('#feedback').html('Server error, please try again later').slideDown().delay(3000).slideUp();
                                }
                            });
                        }
                        break;
                    case 'alternate':
                        type = 'alternate';
                        if(!$(this).val().trim().match(/^[0-9]{10}$/)) {
                            $(this).addClass('edit-error');
                        } else {
                            $(this).removeClass('edit-error');
                            var alternate = $(this).val().trim();
                            $.post('php/infoupdate.php', { field: type, alternate: alternate }, function (data) {
                                if(data == 0) {
                                    $('#feedback').html('Changes committed successfully').slideDown().delay(2000).slideUp();
                                    $('input[name=alternate]').parent().prev().html(alternate).next().children().focusout();
                                } else {
                                    $('#feedback').html('Server error, please try again later').slideDown().delay(3000).slideUp();
                                }
                            });
                        }
                        break;
                    case 'email':
                        type = 'email';
                        if(!$(this).val().trim().match(/^[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z]{2,10}.[a-z]{2,4}$/)) {
                            $(this).addClass('edit-error');
                        } else {
                            $(this).removeClass('edit-error');
                            var email = $(this).val().trim();
                            $.post('php/infoupdate.php', { field: type, email: email }, function (data) {
                                if(data == 0) {
                                    $('#feedback').html('Changes committed successfully').slideDown().delay(2000).slideUp();
                                    $('input[name=email]').parent().prev().html(email).next().children().focusout();
                                } else {
                                    $('#feedback').html('Server error, please try again later').slideDown().delay(3000).slideUp();
                                }
                            });
                        }
                        break;
                    case 'gender':
                        type = 'gender';
                        var gender = $(this).val();
                        $.post('php/infoupdate.php', { field: type, gender: gender }, function (data) {
                            if(data == 0) {
                                $('#feedback').html('Changes committed successfully').slideDown().delay(2000).slideUp();
                                $('select[name=gender]').parent().prev().html(gender).next().children().focusout();
                            } else {
                                $('#feedback').html('Server error, please try again later').slideDown().delay(3000).slideUp();
                            }
                        });
                        break;
                    case 'marital':
                        type = 'marital';
                        var marital = $(this).val();
                        $.post('php/infoupdate.php', { field: type, marital: marital }, function (data) {
                            if(data == 0) {
                                $('#feedback').html('Changes committed successfully').slideDown().delay(2000).slideUp();
                                $('select[name=marital]').parent().prev().html(marital).next().children().focusout();
                            } else {
                                $('#feedback').html('Server error, please try again later').slideDown().delay(3000).slideUp();
                            }
                        });
                        break;
                }
            } else if(event.keyCode == 27) {
                $(this).parent().css('display', 'none').prev('.field').removeClass('dissappear');
            }
            
            event.stopImmediatePropagation();
            event.preventDefault();
        });
        $('#edit-info').click(function (event) {
            if(!edit) {
                $('#edit').html('Click again to deactivate edit');
                $('.field').addClass('hand-cursor');
                edit = true;
            } else {
                $('#edit').html('Edit my information');
                $('.field').removeClass('hand-cursor');
                edit = false;
            }
            
            event.stopImmediatePropagation();
            event.preventDefault();
        });
        $('#surrender').click(function (event) {
            
            $.post('php/infoupdate.php', { field: 'leave', hseno: $scope.info.house_number }, function (data) {
                if(data == 0) {
                    $('#feedback').html('You successfully left the house allocated').slideDown().delay(1000).slideUp(function () {
                        location.reload(true);
                    });
                } else {
                    $('#feedback').html('Something went wrong').slideDown().delay(2000).slideUp();
                }
            });
            
            event.preventDefault();
            event.stopImmediatePropagation();
        });
        $('.field').click(function (event) {
            if (edit) {
                $(this).addClass('dissappear');
                $(this).next('.edit-input').css('display', 'inline-block').children().focus();
            }
            
            event.stopImmediatePropagation();
            event.preventDefault();
        });
        $('#pwd').click(function () {
            $(this).next('.edit-input').css('display', 'inline-block').children().focus();
        });
        $('.email-input').on('input', function () {
            var txtlength = $(this).val().length;
            var maxlength = $(this).attr('maxlength');
            $(this).parent().parent().prev().children().html(maxlength - txtlength);
        });
    }]);

housesModule.controller('AdminController', ['$scope', function ($scope) {
        $('#car').addClass('dissappear');
        
        $.ajax({url: 'php/admin.php', method: 'POST', cache: false, async: false, data: {choice: 'fetch'}, dataType: 'json', success: function(data) {
                $scope.display = data;
                $scope.users = $scope.display.users;
                $scope.userslength = $scope.users.length;
                $scope.requests = $scope.display.requests;
                $scope.requestslength = $scope.requests == '' ? 0 : $scope.requests.length;
                $scope.houses = $scope.display.houses;
        }});
        
        $('div[ng-switch=display]').on('click', '#users-page #users-list .users-display .user-name', function (event) {
            var id = $(this).attr('id');
            $.each($scope.users, function (key, val) {
                if(val.emp_id == id) {
                    $.each(val, function(k, v) {
                        $('#' + k).text(v);
                    });
                }
            });
            event.stopImmediatePropagation();
            event.preventDefault();
        });
        $('div[ng-switch=display]').on('click', '#users-page #users-list .users-display .block', function (event) {
            var id = $(this).attr('id');
            var type = $(this).text();
            $.ajax({url: 'php/admin.php', async: false, cache: false, method: 'POST', data: {choice: 'update', action: 'block', type: type, id: id},
                success: function(data) {
                    if(data == 0) {
                        if (type == 'Block user') {
                            type = 'Unblock user';
                        } else {
                            type = 'Block user';
                        }
                    } else {
                        $('#feedback').html('Something went wrong').slideDown().delay(3000).slideUp();
                    }
                }
            });
            $(this).text(type);
            event.stopImmediatePropagation();
            event.preventDefault();
        });
        $('div[ng-switch=display]').on('click', '#users-page #users-list .users-display .reset', function (event) {
            var id = $(this).attr('id');
            $.ajax({url: 'php/admin.php', async: false, cache: false, method: 'POST', data: {choice: 'update', action: 'reset', id: id},
                success: function(data) {
                    if(data == 0) {
                        $('#feedback').html('Password reset successfull').slideDown().delay(3000).slideUp();
                    } else {
                        $('#feedback').html('Something went wrong').slideDown().delay(3000).slideUp();
                    }
                }
            });
            $(this).text(type);
            event.stopImmediatePropagation();
            event.preventDefault();
        });
        $('div[ng-switch=display]').on('click', '#requests-page .requests-display .approve, #requests-page .requests-display .decline, #requests-page .requests-display .ok', function (event) {
            var id = $(this).attr('id');
            var type = $(this).text().trim();
            var requestType = 'normal';
            var prev = null;
            var house = $(this).parent().attr('id');
            var successful = false;
            $.each($scope.requests, function (key, val) {
                if(val.emp_id == id) {
                    $.each(val, function(k, v) {
                        if(v == 'changing') {
                            requestType = 'changing';
                        } else if (k == 'previous') {
                            prev = v;
                        }
                    });
                }
            });
            $.ajax({url: 'php/admin.php', async: false, cache: false, method: 'POST',
                data: {choice: 'update', action: 'respond', type: type, id: id, house: house, requestType: requestType, prev: prev},
                success: function (data) {
                    console.log(data)
                    if(data == 0) {
                        successful = true;
                    } else {
                        successful = false;
                    }
                }
            });
            if(successful == true) {
                $(this).parent().hide('slow', 'linear', function () {
                    location.reload(true);
                });
            } else {
                $('#feedback').html('Something went wrong').slideDown().delay(3000).slideUp();
            }
            
            event.stopImmediatePropagation();
            event.preventDefault();
        });
    }]);

housesModule.controller('LogoutController', ['$scope', function ($scope) {
        $.post('php/logout.php', {info: 'logout'}, function (data) {
            if (data == 0) {
                location.reload(true);
                isCalled = false;
            }
        });
    }]);

housesModule.controller('HousesController', ['$scope', '$http', function ($scope, $http) {
        if (!isCalled) {
            redirect();
        }
        $('#conditions input').onchange
        $('#sidebar button').click(function () {
            isCalled = false;
            location.hash = '/info';
        });
        $.ajax({url: 'php/housesupdate.php', cache: false, async: false, dataType: 'json'}).done(function (data) {
            $scope.houses = data;
        });
        
        $scope.locationIncludes = [];
        $scope.includeLocation = function (place) {
            var i = $.inArray(place, $scope.locationIncludes);
            if (i > -1) {
                $scope.locationIncludes.splice(i, 1);
            } else {
                $scope.locationIncludes.push(place);
            }
        };
        $scope.locationFilter = function (place) {
            if ($scope.locationIncludes.length > 0) {
                if ($.inArray(place.location, $scope.locationIncludes) < 0)
                    return;
            }
            return place;
        };
        
        $('#form').submit(function (event) {
            selectedHouse = $('input[name=select]:checked').val();
            if(selectedHouse == null) {
                $('#textInAlert').html('Please choose a house first');
            } else {
                $('#confirm').modal('show');
                $('#textInAlert').html('Accept the conditions');
            }
            
            event.preventDefault();
            event.stopImmediatePropagation();
        });
        
        $('.proceed').click(function (event) {
            $.post('php/request.php', { selectedHouse: selectedHouse, requestType: requestType }, (function (response) {
                if(response == 0) {
                    $('#confirm').modal('hide');
                    location.reload(true);
                } else {
                    $('#confirm-alert').css('display', 'inline-block').html('Server side error encountered, seek admin assistance');
                }
            }));
            
            event.stopImmediatePropagation();
            event.preventDefault();
        });
    }]);

housesModule.controller('RegistrationController', ['$scope', function ($scope) {
        $('#car').addClass('dissappear');
        var empId, fname, sname, surname, id, pwd, box, postal, city, phone, alternate, email, gender, marital, error;
        $('#register').submit(function (event) {
            error = false;
            $('.register-input').each(function () {
                switch ($(this).attr('name')) {
                    case 'empId':
                        if(!$(this).val().trim().match(/^[0-9]{4,10}$/)) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            empId = $(this).val().trim();
                        }
                        break;
                    case 'fname':
                        if(!$(this).val().trim().match(/^[A-Za-z]{4,20}$/)) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            fname = $(this).val().trim().substr(0, 1).toUpperCase() + $(this).val().trim().substr(1).toLowerCase();
                        }
                        break;
                    case 'sname':
                        if(!$(this).val().trim().match(/^[A-Za-z]{4,20}$/)) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            sname = $(this).val().trim().substr(0, 1).toUpperCase() + $(this).val().trim().substr(1).toLowerCase();
                        }
                        break;
                    case 'surname':
                        if(!$(this).val().trim().match(/^[A-Za-z]{4,20}$/)) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            surname = $(this).val().trim().substr(0, 1).toUpperCase() + $(this).val().trim().substr(1).toLowerCase();
                        }
                        break;
                    case 'id':
                        if(!$(this).val().trim().match(/^[0-9]{7,8}$/)) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            id = $(this).val().trim();
                        }
                        break;
                    case 'pwd':
                        if($(this).val().trim().match(/\s/) || $(this).val().trim().length < 6) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            pwd = $(this).val().trim();
                        }
                        break;
                    case 'rpwd':
                        if($(this).val().trim() != pwd) {
                            $(this).addClass('glow-error');
                            $('input[name=pwd]').addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            pwd = $(this).val().trim();
                        }
                        break;
                    case 'box':
                        if(!$(this).val().trim().match(/^[0-9]{3,10}$/)) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            box = $(this).val().trim();
                        }
                        break;
                    case 'postal':
                        if(!$(this).val().trim().match(/^[0-9]{3,10}$/)) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            postal = $(this).val().trim();
                        }
                        break;
                    case 'city':
                        if(!$(this).val().trim().match(/^[A-Za-z]{4,30}$/)) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            city = $(this).val().trim().substr(0, 1).toUpperCase() + $(this).val().trim().substr(1).toLowerCase();
                        }
                        break;
                    case 'phone':
                        if(!$(this).val().trim().match(/^[0-9]{10}$/)) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            phone = $(this).val().trim();
                        }
                        break;
                    case 'alternate':
                        if(!$(this).val().trim().match(/[0-9]{10}$/)) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            alternate = $(this).val().trim();
                        }
                        break;
                    case 'email':
                        if(!$(this).val().trim().match(/^[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z]{2,10}.[a-z]{2,4}$/)) {
                            $(this).addClass('glow-error');
                            error = true;
                        } else {
                            $(this).removeClass('glow-error');
                            email = $(this).val().trim();
                        }
                        break;
                    case 'gender':
                        gender = $(this).val();
                        break;
                    case 'marital':
                        marital = $(this).val();
                        break;
                }
            });
            if(error) {
                $('#registration-alert').html('Input errors encountered, please review the highlighted input fields');
            } else {
                $.post('php/register.php', { empId: empId, fname: fname, sname: sname, surname: surname, id: id, pwd: pwd, box: box, gender: gender,
                    postal: postal, city: city, phone: phone, alternate: alternate, email: email, marital: marital }, function (response) {
                    if (response == 0) {
                        location.reload(true);
                    } else if($.type(response) == 'string') {
                        $('#registration-alert').html('User already exist as ' + response);
                    } else {
                        $('#registration-alert').html('There was some technical errors, refresh and try again or seek admin assistance');
                    }
                });
            }
            
            event.stopImmediatePropagation();
            event.preventDefault();
        });
        $scope.$on('$destroy', function () {
            $('#car').removeClass('dissappear');
        });
    }]);


function redirect() {
    $.post('php/session.php', { }, function (data) {
        if (data != 1) {
            $('#loginReg').css('display', 'none');
            $('#user').html(data);
            loggedIn = true;
            switch (location.href) {
                case 'http://localhost/HouseBookingSystem/#/houses':
                    location.hash = 'houses';
                    break;
                case 'http://localhost/HouseBookingSystem/#/admin':
                    location.hash = '/admin';
                    break;
                default:
                    if(data.toLowerCase() == 'admin') {
                        location.hash = '/' + data.toLowerCase();
                    } else {
                        location.hash = '/info';
                    }
                    
                    break;
            }
            location.hash = data.toLowerCase() == 'admin' ? '/admin' : '/info';
            $('#car').css('display', 'none');
        } else {
            $('#logout').css('display', 'none');
            if(location.href == 'http://localhost/housebookingsystem/#/register') {
                location.hash = '/register';
            } else {
                location.hash = '/';
            }
        }
    });
}

function uncheck() {
    var checkboxes = document.getElementsByTagName('input');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type === 'checkbox') {
            checkboxes[i].checked = false;
        }
    }
}