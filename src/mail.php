<?php
  $to      = 'blinkstar.messages@gmail.com';
  $subject = 'BlinkOff [new request]';
  $name = trim(urldecode(htmlspecialchars($_POST['contanct-name'])));
  $phone = trim(urldecode(htmlspecialchars($_POST['phone'])));
  $email = trim(urldecode(htmlspecialchars($_POST['email'])));
  $message = 'Имя: ' .$name. "\r\n". 'Телефон: ' .$phone. "\r\n". 'E-mail: ' .$email. "\r\n";
  $headers = 'From: blink-off@blink-off.ru' . "\r\n" .
      'X-Mailer: PHP/' . phpversion();

  $sended = mail($to, $subject, $message, $headers);

  if($sended){
    echo "Ваши контактные данные успешно отправлены!";
  }
?>