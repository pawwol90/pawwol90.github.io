# Tablice wielowymiarowe

Podczas ostatnich zajęć poznawaliśmy tajniki tablic jednowymiarowych. Tak jak można było w tablicy umieścić dane tak możemy też umieścić dodatkowo jeszcze jedną tablicę i dopiero w niej dane. Możemy też w nieskończoność dodawać tablice w tablcy aż na końcu gdzieś będą dane, ALE poruszanie się po tego typu obiektach jest skomplikowane. Zazwyczaj operujemy na tablicach jednowymiarowych (pozanych na zajęciach) oraz dwu i trójwymiarowych.

## [Materiały](T22_Materiały.pdf)

## Tworzenie tablicy dwu wymiarowej

Dla przypomnienia, tworzenie zwykłej tablicy odbywało się w poniższy sposób:

```csharp
string[] tablica = new string[5];
```

Powyższa tablica ma rozmiar 5 elementów. Można to poznać po numerze `5` wewnatrz `[]` na końcu. Natomiast sama kominacja symboli `[]` na początku powyższego zapisu informuje komputer, że będziemy tworzyli tablicę typu string: `string[]` tablica ta będzie nazwana `tablica` i będzie nową tablicą typu string skłądającą się z 5ciu elementów `new string[5]`.

Tablica dwuwymiarowa różni się już na poziomie tworzenia zmiennej reprezentującej tą tablcę:

```csharp
string[,] dwaWymiary = new string[5,10];
```

Przecinek w środku `[]` oznacza, że będziemy mieli dwa wymiery tablicy. Każdy element w takiej tablicy będzie miał dwa indeksy. Można by powiedzieć, że każdy z nich będzie miał swoje współrzędne. Tak jak zwykłą tablicę wyobrażaliśmy sobie jak pudełko w którym posiadamy równe przegródki, tak tablica dwuwymiarowa będzie pudełkiem, wewnątrz któego znajdują się pudełka w których są przegródki. W ten sposób aby dotrzeć do informacji, która znajduje się w wybranym pudełku i w wybranej przegródce pudełka potrzebujemy dwóch informacji: numeru pudełka i przegródki. W przykładzie powyżej nasza tablica to pudełko w którym znajduje się 5 mniejszych pudelek, a każde z nich ma 10 przegródek.

Tablicę dwuwymiarową łatwo sobie wyobrazić jako sala kinowa, gdzie pierwszy indeks tablicy to numer rzędu, a pierwsza wartość rozmiaru tablicy to liczba wszystkich rzędów w sali kinowej. W rzędzie znajduje się N miejsc, więc kolejna wartość rozmiaru tablicy to liczba miejsc, a wpisując do tablicy numer konkretnego miejsca uzyskujemy dostęp do miejsca w sali kinowej.

### Ćwiczenie 1

Stwórz projekt aplikacji o nazwie `Sala kinowa`. Doprowadź projekt do stanu, w którym uruchamia się, a po naciśnięciu na dowolny klawisz kończy działanie. Niech to będzie podstawa naszego programu. Następnie w pierwszej linijce funkcji `Main` dodaj tablicę dwuwymiarową o nazwie: `SalaKinowa`, sala będzie miała wymiary 8 rzędów i 20 miejsc. Każde miejsce będzie opisane 1 znakiem, więc zastosuj tablicę typu `char`.

Program po zadaniu powinien się uruchamiać, nic nie wyświetlać i po wciśnieciu dowolnego klawisza powinien się zamknąć bezbłędnie.

## Ustawianie wartości elementu tablicy

Nasz program ma obecnie tablicę o wymiarach 8 na 20. Można sobie to wyobrazić jako kratki w zeszycie ograniczone w powyższy sposób. Do każdej kratki możemy wpisać 1 znak (`char`). Tak jak w jednowymiarowej tablicy indeksy dla tablicy 10cio elementowej liczone były od 0 do 9, tak w przypadku naszej tablicy 8x20 będziemy potrzebowali dwóch indeksów:

1. Od 0 do 7
2. Od 0 do 19

Aby zapisać lub wyświetlić (odwołać się do konkretnej wartości tablicy) należy użyć indeksowania zapisanego w poniższy sposób:

```csharp
SalaKinowa[3, 13]
```

I powyższy sposób może posłużyć do wyświetlenia:

```csharp
Console.WriteLine(SalaKinowa[3, 13]);
```

oraz do zapisu wartości:

```csharp
SalaKinowa[3, 13] = '#';
```

Zapis `'#'` jest poprawny ponieważ tablica trzyma w sobie pojedyncze znaki a nie ciągi znaków, gdybyśmy zastosowali typ `string` moglibyśmy wówczas wartość przypisać przy użyciu `"cudzysłowia"`.

### Ćwiczenie 2

Wybierz sobie miejsce w sali kinowej i przypisz do niego symbol `#`.

Program po zadaniu powinien się uruchamiać, nic nie wyświetlać i po wciśnieciu dowolnego klawisza powinien się zamknąć bezbłędnie.

## Poruszanie się po tablicy

Do tablicy mogliśmy się odwoływać bezpośrednio za pomocą indeksów albo generycznie przy pomocy pętli, która kolejno generowała nam indeksy w tablicy:

```csharp
string[] imiona = new string[5];
for(int i = 0; i < imiona.Length; i++)
{
    Console.WriteLine(imiona[i]);
}
```

Pętla wykorzystywana była tutaj po to, aby wygenerować kolejne numery indeksów. Jako, że w tablicy dwuwymiarowej posiadamy dwa indeksy. Dla każdego indeksu pierwszego poziomu, mamy również N indeksów drugiego to generyczne poruszanie się po naszej sali kinowej powinno wyglądać w następujący sposób:

```csharp
char[,] SalaKinowa = new char[8,20];
SalaKinowa[3, 13] = '#';
for(int rzad = 0; rzad < SalaKinowa.GetLength(0); rzad++)
{
    for(int miejsce = 0; miejsce < SalaKinowa.GetLength(1); miejsce++)
    {
        Console.Write(" |{0}| ", SalaKinowa[rzad, miejsce]);
    }
    Console.WriteLine();
}
```

W pętlach została użyta funkcja `GetLength` z parametrem `0` lub `1`. Jest to funckja która zwraca rozmiar wybrnego wymiaru tablicy, licząc od 0. Można powiedzieć, że:

1. `GetLength(0)` - daje nam informację ile mamy rzędów w tablicy (ile poddtablic jest w tablicy).
2. `GetLength(1)` - daje informacje ile miejsc mają poszczególne rzędy (ile elementów ma pojedyncza podtablica).

Jak działa powyższe zagnieżdżenie pętli:

1. Pierwsza pętla w pierwszym kroku zapisuje do `rzad` wartość `0`, sprawdzamy czy owa wartość mieści się w pierwszym wymiarze tablicy (`GetLength(0)`)? Pierwszy wymiar dla nas to `8`, a `0 < 8 ` to prawda. Zatem pętla rozpocznie wykonywanie.
2. Druga pętla stworzy na swoje potrzeby zmienną `miejsce` i przypisze również `0`. Następnie sprawdzi czy wartość nowej zmiennej jest mniejsza od rozmiaru drugiego wymiaru naszej tablicy (`GetLength(0)`)? Drugi wymiar ma `20`, więc `0 < 20` to prawda, pętla rozpocznie wykonywanie. W naszym wypadku wyświetli się elemnt na indeksie `[0, 0]`.
3. Po zakończeniu działania pierwszego przebiegu DRUGIEJ pętli algorytm zwiększa numer miejsca o 1, mamy zatem w zmiennej `miejsce` wartość `1`, a w zmiennej `rzad` nadal wartość `0`. Nastąpi sprawdzenie czy `1 < 20` - tak więc pętla się wykona, ale teraz wyświetli się wartość na indeksie `[0, 1]`.
4. Zatem pętla wewnętrzna wykona się od `0 do 19` dla wartości zmiennej `rzad` równej `0` i po 19 przebiegach dujdzie do jej przerwania, a następnie pętla pierwsza (ta która tworzyła zmienną `rzad`) zwiększy numer rzędu o 1 i rozpocznie na nowo działanie drugiej pętli, ale znów od `0 do 19`. 
5. Te operacje będą się powtarzały tak długo aż zmienna `rzad` osiągnie wartość `8` wtedy warunek `8 < 8` stanie się fałszywy i pierwsza pętla się przerwie. Zatem dla każdego rzędu zostanie wygenerowany seria kolejnych numerów miejsca, które to razem (rząd i miejsce) pozwolą na poruszanie się po tablicy. Dodatkowo po wykonaniu drugiej pętli wywoływany jest `Console.WriteLine()` zapewnia to efekt przejścia do nowego rzędu.

### Ćwiczenie 3

Jak już zdążyłeś zauważyć nasz program nic nie wyświetla, jednak za pomocą algorytmu omówionego powyżej powinieneś potrafić wyświetlić całą salę kinową. Posłuż się kodem przedstawionym powyżej. Pamiętaj, aby pozostawić przypisany symbol `#` w wybranym przez Ciebie miejscu - teraz będzie on widoczny na ekranie. Efekt powinien być następujący:

![Efekt wyświetlania tablicy](Grafiki/screen01.png)
Jeśli pionowe kreski na zrzucie są kolorowe - to bład - powinny być białe

Policz czy wybrane przez Ciebie miejsce wyświetla się poprawnie na ekranie. Wpisałem indeks 3 i 13 wiec `#` jest w 4tym rzędzie, na miejscu 14.

## Ćwiczenie 4

Dodajmy do programu możliwość zapełniania sali kinowej. Program będzie w pętli wyświetlał naszą salę tak jak dotychczas. Najpierw program zapyta użytkownika czy chce dodać widza, jeśli ten wpisze odpowiednią literkę (`t`) włączy tryb dodawania widza, w którym zostanie zapytany o numer rzędu i miejsce, w którym widz chce usiąść. Po wpisaniu danych powinniśmy w miejscu, gdzie usiadł widz wstawić symbol `#` w naszej tablicy. Zrealizuj krok po kroku wszystkie punkty poniższego opisu.

Przed pierwszą pętlą dodaj do programu:

1. Zmienną typu `char` o nazwie: `decyzja` z domyślną wartością 't':

    ```csharp
    char decyzja = 't';
    ```

2. Następnie obie pętle for `ubierz` w pętle while, która będzie działała tak długo jak zmienna `decyzja` będzie miała wartość `'t'`. Całość powinna wyglądać następująco:

    ```csharp
    char[,] SalaKinowa = new char[8,20];
    SalaKinowa[3, 13] = '#';
    char decyzja = 't';
    while(decyzja == 't')
    {
        for(int rzad = 0; rzad < SalaKinowa.GetLength(0); rzad++)
        {
            for(int miejsce = 0; miejsce < SalaKinowa.GetLength(1); miejsce++)
            {
                Console.Write(" |{0}| ", SalaKinowa[rzad, miejsce]);
            }
            Console.WriteLine();
        }
    }
    ```

3. Wewnątrz pętli `while` pod pętlami for, wyświetl napis `Czy chcesz dodać widza?[t/n]` przy pomocy `Console.Write()`. Pamiętaj, że symbol `/` można łątwo pomylić z `\` a taki zapis `\n` spowoduje przejście do nowej linii!

    ```csharp
    Console.Write("Czy chcesz dodać widza?[t/n]");
    ```

4. W kolejnym kroku, pod powyższym wyświetlaniem, odczytajmy linijkę od użytkownika i pobierzmy jej pierwszy znak i zapiszmy do istniejącej zmiennej `decyzja`:

    ```csharp
    decyzja = Console.ReadLine()[0];
    ```

5. Program powinien się dać uruchomić, po ciśnięciu `t` powinna wyświetlić sie nasza wirtualna sala kinowa. Po wciśnieciu `n` program powinien zakończyć działanie. Kod powinien wyglądać następująco:

    ```csharp
    char[,] SalaKinowa = new char[8,20];
    SalaKinowa[3, 13] = '#';
    char decyzja = 't';
    while(decyzja == 't')
    {
        for(int rzad = 0; rzad < SalaKinowa.GetLength(0); rzad++)
        {
            for(int miejsce = 0; miejsce < SalaKinowa.GetLength(1); miejsce++)
            {
                Console.Write(" |{0}| ", SalaKinowa[rzad, miejsce]);
            }
            Console.WriteLine();
        }
        Console.Write("Czy chcesz dodać widza?[t/n]");
        decyzja = Console.ReadLine()[0];
    }
    ```

6. Teraz powinniśmy dodać do programu obsługę dodawania kolejnego widza. Zatem po linijce:

    ```csharp
    decyzja = Console.ReadLine()[0];
    ```

    dodaj sprawdzenie czy użytkownik wyraził chęć dodania nowego widza (wcisnął `t`):

    ```csharp
    if(decyzja == `t`)
    {

    }
    ```

7. Wewnątrz IF'a zapytajmy o numer rzędu:

    ```csharp
    Console.Write("Podaj numer rzędu: ");
    int r = int.Parse(Console.ReadLine());
    ```

8. Oraz o numer miejsca (również wewnątrz IF'a):

    ```csharp
    Console.Write("Podaj numer miejsca: ");
    int m = int.Parse(Console.ReadLine());
    ```

9. Jako ostatni krok w IF'ie zajęcie miejsca przez widza w naszej tabeli reprezentującej salę kinową:

    ```csharp
    SalaKinowa[r - 1, m - 1] = '#';
    ```
    Zakładamy, że użytkownik nie zna programowania, wiec jeśli poda, że widz chce siedzieć w rzędzie 1 na miejscu 1 to my zapisujemy go na indeksie `0, 0`, stąd `r - 1` i `m - 1`

10. Kod teraz powinien prezentować się następująco:

    ```csharp
    char[,] SalaKinowa = new char[8,20];
    SalaKinowa[3, 13] = '#';
    char decyzja = 't';
    while(decyzja == 't')
    {
        for(int rzad = 0; rzad < SalaKinowa.GetLength(0); rzad++)
        {
            for(int miejsce = 0; miejsce < SalaKinowa.GetLength(1); miejsce++)
            {
                Console.Write(" |{0}| ", SalaKinowa[rzad, miejsce]);
            }
            Console.WriteLine();
        }
        Console.Write("Czy chcesz dodać widza?[t/n]");
        decyzja = Console.ReadLine()[0];
        if(decyzja == `t`)
        {
            Console.Write("Podaj numer rzędu: ");
            int r = int.Parse(Console.ReadLine());
            Console.Write("Podaj numer miejsca: ");
            int m = int.Parse(Console.ReadLine());
            SalaKinowa[r - 1, m - 1] = '#';
        }
    }
    ```

11. Po uruchomieniu i dodawaniu kolejnych widzów nasza sala kinowa powinna się wyświetlać zaraz pod wpisanym tekstem. Nie jest to estetyczne rozwiązanie. Na początku peli `while`, przed pierwszą pętlą `for` dodajmy czyszczenie ekranu:

    ```csharp
    Console.Clear();
    ```

12. Całość powinna wyglądać następująco:

    ```csharp
    char[,] SalaKinowa = new char[8,20];
    SalaKinowa[3, 13] = '#';
    char decyzja = 't';
    while(decyzja == 't')
    {
        Console.Clear();
        for(int rzad = 0; rzad < SalaKinowa.GetLength(0); rzad++)
        {
            for(int miejsce = 0; miejsce < SalaKinowa.GetLength(1); miejsce++)
            {
                Console.Write(" |{0}| ", SalaKinowa[rzad, miejsce]);
            }
            Console.WriteLine();
        }
        Console.Write("Czy chcesz dodać widza?[t/n]");
        decyzja = Console.ReadLine()[0];
        if(decyzja == `t`)
        {
            Console.Write("Podaj numer rzędu: ");
            int r = int.Parse(Console.ReadLine());
            Console.Write("Podaj numer miejsca: ");
            int m = int.Parse(Console.ReadLine());
            SalaKinowa[r - 1, m - 1] = '#';
        }
    }
    ```

13. Program powinien teraz działać następująco:

Pytanie o miejsce widza:
![Pytanie o miejsce widza](Grafiki/screen02.png)

Odświeżona sala kinowa:
![Odświeżona sala kinowa](Grafiki/screen03.png)

### Ćwiczenie 5* - NIEOBOWIĄZKOWE

Wyświetl salę kinową tak, aby po bokach pojawiły się numery miejsc i rzędów.

![Numery miejsc i rzędów](Grafiki/screen04.png)

## Ćwiczenie 6** - NIEOBOWIĄZKOWE PRO

Obecnie w programie wpisując numer rzędu lub miejsca, które jest już zajęte da się je zająć - spróbuj sprawić aby program pytał tak długo o miejsce i rząd aż użytkownik trafi na wolne miejsce.

Dodatkowo użytkownik może podać nieistniejące miejsce - spraw aby program pytał ponownie o miejsce i rząd jeśli użytkownik poda zbyt dużą liczbę lub liczbę równą 0 i mniejszą.

## Wyślij rozwiazania

Przygotuj kod źródłowy programu powstałego w trakcie realizacji ćwiczeń do wysyłki na podstawie [instrukcji](../ZdalneInstrukcja#wysyłanie-projektu-aplikacji-konsolowej)

Adres do wysyłki: [pawel.woloszyn@akademiamlodychprogramistow.pl](mailto:pawel.woloszyn@akademiamlodychprogramistow.pl)

Temat Maila: `Tablice wielowymiarowe`.
