# Instrukcja Switch
---

Zdarza się, że potrzebujemy sprawdzić kilkukrotnie jakąś zmienną pod kątem różnych jej wartości. Na przykład kiedy wyświetlimy użytkownikowi takie menu:

```
1. Wyświetl jakiś napis
2. Wykonaj dodawanie
3. Wyjdź

Podaj numer opcji do wykonania:
```

Program w swojej logice musi pobrać od użytkownika cyferkę, która odpowiada danej opcji, na przykład `int wybor = int.Parse(Console.ReadLine())`. Następnym krokiem byłoby sprawdzenie czy zmienna `wybor` ma odpowiednią wartość, na przykład:

```
if(wybor == 1)
{
    //Logika odpowiedzialna za wyświetlanie `jakiegoś napisu`
}
if(wybor == 2)
{
    //Logika odpowiednia dla drugiej opcji w menu
}
if(wybor == 3)
{
    //Logika dla ostatniej opcji w menu
}
```

Jak widać w powyższym przykładzie sprawdzaliśmy za każdym razem jedną zmienną lecz z różnymi wartościami. Jest to bardzo dobry przykład gdzie zastosowanie znajdzie instrukcja `switch`. Poniżej ten sam kod zapisany przy pomocy `swtich`:

```
switch(wybor)
{
    case 1:
        //Logika odpowiedzialna za wyświetlanie `jakiegoś napisu`
        break;
    case 2:
        //Logika odpowiednia dla drugiej opcji w menu
        break;
    case 3:
        //Logika dla ostatniej opcji w menu
        break;
}
```

Należy pamiętać, że w każym `case` należy na koniec po wykonaniu wszystkich operacji użyć słówka kluczowego `break`, któe uchroni nas przed dalszym, błednym przetwarzaniem funkcji switch.


## Zadanie

Napisz program który pobierze dwie liczby typu `int` a następnie pokaże menu:

```
Jaką operację chcesz wykonać:
    + - dodawanie
    - - odejmowanie
    * - mnożenie
    / - dzielenie
```

Jeśli użytkownik wybierze symbol operacji wykonaj stosowne dla niej obliczenia i wyświetl na ekran.