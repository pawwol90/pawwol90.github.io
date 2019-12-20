# Stoper

1. Stwórzmy prosty stoper z funkcjami: start, stop i reset.
   1. Dodaj do okna label, który będzie wyświetlał czas
   2. Dodaj do okna 3 przyciski:
      1. Start
      2. Stop
      3. Reset
   3. Dodaj do okna timer z interwałem 1s (1000ms)
   4. Przycisk Start powinien uruchomić timer
   5. Przycisk Stop powinien zatrzymać timer
   6. Przycisk reset powinien zresetować wartość zliczonych sekund i pokazać czas w labelce 
   7. Do pokazywania czasu stwórz osobną funkcję, ponieważ używana ona będzie w kilku miejscach - czas wyświetlaj w formacie `Godziny:Minuty:Sekundy` - najpierw bez zer wiodących. Pamiętaj, aby dobrze obliczyć czas na podstawie zliczonych sekund - patrz Podpowiedź 2.
   8. Po każdym odliczeniu 1sekundy zwiększ wartość licznika sekund a następnie użyj funkcji wyświetlającej czas. Jako licznik sekund użyj liczby typu INT i zwiększaj ją za każdym razem kiedy wystąpi zdarzenie `Tick` timera.
   9. Jeżeli twój timer dobrze liczy czas zmodyfikuj wyświetlanie czasu tak, aby widoczne były zera wiodące - patrz podpowiedź 1.
2. Dodaj do stopera możliwość zapisu międzyczasów.
   1. Dodaj do okna przycisk "Międzyczas".
   2. Dodaj do okna kontrolkę ListBox do której będziesz dodawał(a) międzyczasy.
   3. Po przyciśnięciu nowego przycisku dodawaj do listy aktualny czas wraz z numerkiem odpowiadającym konkretnemu międzyczasowi.
   4. Zmodyfikuj przycisk Reset tak, aby czyścił listę międzyczasów.

![Wygląd okna](Grafiki/T18_screen1.png)

## Podpowiedź 1

Aby wyświetlić liczbę: `int liczba = 0;` z zerami wiodącymi należy wykonać poniższy kod:

`liczba.ToString("d2");`

## Podpowiedź 2

Zapisując w zmiennej skundy należy je dobrze przeliczyć. 

Przykład:
Program zliczył 3662 sekundy. To jest 1godzina, 1minuta i 2sekundy.
1. Aby obliczyć sekundy należy wyciągnąć resztę z dzielenia przez 60 ze zliczonych sekund. 

    Resztę z dzielenia obliczamy następująco 
    
    `int sekundyDoWyswietlenia = sekundy % 60;`

2. Kolejnym krokiem jest obliczenie minut.

   Tutaj najpierw zliczone sekundy należy przeliczyć minuty: 
   
   `int minuty = sekundy / 60;`

   A następnie (uwzględniając fakt iż nasz stoper liczy również godziny), wyciągnąć pozostałe minuty z godziny.
   
   W tym celu należy policzyć resztę z dzielenia przez ilość minut w godzinie (60) 
   
   `int munutyDoWyswietlenia = minuty % 60;`.

3. Ostatnim etapem jest przedstawienie odpowiedniej liczby godzin.
   
   Liczbę godzin wyznaczamy następująco: 
   
   `int godziny = sekundy / 3600;`