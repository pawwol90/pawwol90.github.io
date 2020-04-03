# Temat 20 - Tablice utrwalanie mateirału

## [Materiały](Materiały.pdf)

Temat stanowi utrwalenie i uzupełnienie wiedzy z zakresu tablic.

## Rozmiar tablicy podany przez użytkownika

Dotychczas definiowaliśmy tablice w poniższy sposób:

```csharp
string[] imiona = new string[5];
```

Pierwszy człon `string[]` informował kompilator o tym, że definiowana jest tablica elementów o typie `string` o nazwie, która jest wskazana jako kolejny człon definicji, w tym wypadku była to nazwa: `imiona`. Za znakiem równości, znajduje się informacja o tym, że tworzona jest nowa 5cio elementowa tablica `new string[5]` wspomnianego typu (`string`).

Gdybyśmy chcieli zdefiniować 5cio elementową tablicę liczb wyglądało by to następująco:

```csharp
int[] liczby = new int[5];
```

Definicja wygląda bardzo podobnie. Jak łatwo zauważyć, w ostatnich klamrach kwadratowych (`[`) nadal wstawamy liczbę `5`, która oznacza rozmiar tablicy. Zamiast stałej cyfry można wstawić jakąś zmienną typu `int`, która wskaże jaki powinien być rozmiar naszej tablicy. Tym samym powyżej przedstawiony zapis można również przestawić następująco:

```csharp
int rozmiar = 5;
int[] liczby = new int[rozmiar];
```

Jak widać, zmienna o nazwie `rozmiar` ustala rozmiar tablicy. W powyższym przykładzie rozmiar ten wyniesie znoów `5`, ale nic nie stoi na przeszkodzie aby wartość zmiennej `rozmiar` była inna.

### Jak wykorzystać rozmiar definiowany przez zmienną

Jeżeli możemy zdefiniować zmienną, która ustala rozmiar tablicy, to możemy również o wartość tej zmiennej poprosić użytkownika i użyć w momencie tworzenia tablicy. Całość może wyglądać następująco:

```csharp
Console.Write("Podaj rozmiar tablicy: ");
int rozmiarTablicy = int.Parse(Console.ReadLine());
int[] tablica = new int[rozmiarTablicy];
```

#### Zadanie 1

Wykonaj program z poprzednich zajęć, który:

1. Zapyta użytkownika o liczbe graczy.
2. Stworzy w pamięci tablicę o zadanym przez użytkownika rozmiarze (rozmiar = liczba graczy podana przez użytkownika).
3. Pobierze w pątli imiona graczy.
4. Wyczyści ekran.
5. Wyświetli liczbę graczy z tablicy.

![Pobieranie danych od użytkownika](Grafiki\T20_screen01.png)

![Wyświetlanie danych](Grafiki\T20_screen02.png)

### Zadanie 2 - średnia ocen szkolnych

Potrafisz już napisać program, który zapyta użytkownika o rozmiar tablicy, uzupełni jej zawartość i wyświetli na ekranie. Pora na zastąpienie wyświetlania w pętli jakimiś obliczeniami. Stwórz program który obliczy średnią ocen, wykonujący poniższe kroki:

1. Zapytaj użytkownika o liczbę ocen jaką chce podać i zapisz tą liczbę do zmiennej typu `int`.
2. Stwórz tablicę typu `double`, która przechowa wartości ocen - załóżmy, że 4,5 to 4+ a 3,75 to 4-, więc potrzebujemy zmiennych zmiennoprzecinkowych, czyli typ `double`. Rozmiar tablicy to liczba ocen z poprzedniego punktu.
3. W pętli zapytaj użytkownika o kolejne oceny i zapisz je w tablicy.
4. Stwórz zmienną typu `double` o nazwie `suma`.
5. W pętli odczytaj kolejne oceny i dodaj ich wartość do zmiennej `suma`
6. Po pętli wykonaj obliczenie średniej, czyli dzielenie sumy ocen (wyliczoną w pętli) przez ich liczbę (podaną przez użytkownika na początku programu).
7. Wyświetl średnią ocen.

![Wyświetlanie danych](Grafiki\T20_screen03.png)

### Zadanie 3*

*Zadanie jest dodatkowe, nie jest obowiązkowe*

Zmodyfikuj program z zadania 3 tak, aby obliczał średnią tak długo aż użytkownik wciśnie `esc`. Tutaj należy zapętlić odpowiednio logikę z zadania 3 i dodatkowo pobierać od użytkownika klawisz i sprawdzać czy jest różny od `ESC` - jeśli `ESC` to pętla powinna przerwać swoje działanie.

![Wyświetlanie danych](Grafiki\T20_screen04.png)

## Wyślij rozwiazania

Podczas zajęć stworzyłeś dwa programy w konsoli.

Przygotuj kod źródłowy obu programów do wysyłki na podstawie [instrukcji](../ZdalneInstrukcja#wysyłanie-projektu-aplikacji-konsolowej)

Adres do wysyłki: [pawel.woloszyn@akademiamlodychprogramistow.pl](mailto:pawel.woloszyn@akademiamlodychprogramistow.pl)

Temat Maila: `Tablice - utrwalanie wiadomości`