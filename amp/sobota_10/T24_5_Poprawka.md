# Test - losowanie drużyn - poprawka

## Wyjaśnienie zasady losowania drużyn

Mamy 3 koszyki, w których są po 4 drużyny:

| Koszyk 1   | Koszyk 2   | Koszyk 3   |
| ---------- | ---------- | ---------- |
| Drużyna 01 | Druzyna 05 | Druzyna 09 |
| Drużyna 02 | Druzyna 06 | Druzyna 10 |
| Drużyna 03 | Druzyna 07 | Druzyna 11 |
| Drużyna 04 | Druzyna 08 | Druzyna 12 |

z nich będziemy losować 4 grupy po 3 drużyny:

| Grupa 1 | Grupa 2 | Grupa 3 | Grupa 4 |
| ------- | ------- | ------- | ------- |
| -       | -       | -       | -       |
| -       | -       | -       | -       |
| -       | -       | -       | -       |

Tak samo losowane są drużyny do wielu turniejów miedzy narodowych. W przypadku naszego programu najpierw musimy poprosić użytkownika o zawartość koszyków. Następnie całość postępuje według poniższej listy kroków:

1. Rozpoczynamy losowanie drużyn do pierwszej grupy:

   | Grupa 1 |
   | ------- |
   | -       |
   | -       |
   | -       |

2. Bierzemy pierwszy koszyk:

   | Koszyk 1   |
   | ---------- |
   | Drużyna 01 |
   | Drużyna 02 |
   | Drużyna 03 |
   | Drużyna 04 |

3. Losujemy z niego dowolną drużynę:

   `Drużyna 02`

4. Usuwamy tą drużynę z koszyka:

   | Koszyk 1   |
   | ---------- |
   | Drużyna 01 |
   | -          |
   | Drużyna 03 |
   | Drużyna 04 |

5. Zapisujemy ją do naszej grupy na początek:

   | Grupa 1    |
   | ---------- |
   | Drużyna 02 |
   | -          |
   | -          |

6. Bierzemy kolejny koszyk, w celu wylosowania kolejnej drużyny do `Grupy 1`:

   | Koszyk 2   |
   | ---------- |
   | Druzyna 05 |
   | Druzyna 06 |
   | Druzyna 07 |
   | Druzyna 08 |

7. Losujemy z kolejnej grupy jedną drużynę:

   `Druzyna 08`

8. Usuwamy wybraną drużynę z grupy:

   | Koszyk 2   |
   | ---------- |
   | Druzyna 05 |
   | Druzyna 06 |
   | Druzyna 07 |
   | -          |

9. Zapisujemy na kolejnym wolnym miejscu w `Grupie 1`:

   | Grupa 1    |
   | ---------- |
   | Drużyna 02 |
   | Druzyna 08 |
   | -          |

10. Bierzemy kolejny, ostatni koszyk:

    | Koszyk 3   |
    | ---------- |
    | Druzyna 09 |
    | Druzyna 10 |
    | Druzyna 11 |
    | Druzyna 12 |

11. Znów losujemy z niego drużynę:

    `Druzyna 09`

12. Usuwamy drużynę z koszyka:

    | Koszyk 3   |
    | ---------- |
    | -          |
    | Druzyna 10 |
    | Druzyna 11 |
    | Druzyna 12 |

13. Zapisujemy na ostatnim, wolnym miejscu w grupie:

    | Grupa 1    |
    | ---------- |
    | Drużyna 02 |
    | Druzyna 08 |
    | Druzyna 09 |

14. W ten sposób uzupełniliśmy jedną grupę. Stan naszych koszyków jest teraz następujący:

    | Koszyk 1   | Koszyk 2   | Koszyk 3   |
    | ---------- | ---------- | ---------- |
    | Drużyna 01 | Druzyna 05 | -          |
    | -          | Druzyna 06 | Druzyna 10 |
    | Drużyna 03 | Druzyna 07 | Druzyna 11 |
    | Drużyna 04 | -          | Druzyna 12 |

15. Oprócz tego mamy uzuepłnioną `Grupę 1`:

    | Grupa 1    | Grupa 2 | Grupa 3 | Grupa 4 |
    | ---------- | ------- | ------- | ------- |
    | Drużyna 02 | -       | -       | -       |
    | Druzyna 08 | -       | -       | -       |
    | Druzyna 09 | -       | -       | -       |

Jak łatwo zauważyć w kolejnych krokach jest szansa na wylosowanie miejsc w koszykach, w których nie ma już drużyn - patrząc oczywiście od technicznej strony, gdzie każdy koszyk jest tablicą jednowymiarową, a usunięcie danej drużyny z koszyka to zastąpienie nazwy drużyny pustym tekstem.

Należy zatem po każdym wolosowaniu miejsca w koszyku sprawdzić czy jest tam nazwa drużyny, a ujmując to bardzo dosadnie: sprawdzić czy znajduje się tam pusty tekst.

Zarówno grupy jak i koszyki są dwoma tablicami dwuwymiarowymi. Pierwsza w naszym przykłądzie ma wymiar 3x4, druga, ta odpowiedzialna za docelowe grupy, ma rozmiar 4x3.

Dlaczego wymiary nie są identyczne? Ponieważ do każdej grupy losujemy po jednej drużynie z każdego koszyka, zatem mając 3 koszyki w każdej grupie będzie po 3 drużyny. A mając 4 drużyny w każdym koszyku, aby każda zagrała w turnieju konieczne jest wylosowanie 4 grup, aby wykorzystać je wszystkie.

## Implementacja - tablica koszyków

Tak jak zostało na wstępnie omówione, koszyki z grupami są znane (nie wiemy co zostanie z nich wylosowane, ale wiemy kto w nich jest). Zatem użytkownik naszego programu może podać te dane. Wcześniej jednak należy stworzyć odpowiednie miejsce na ich przechowywanie. Aby stworzyć odpowiednią tablicę musimy wiedzieć ile koszyków ma użytkownik i ile drużyn w tych koszykach się znajduje.

Zatem pierwszą operacją będzie pobranie od użytkownika wymiarów naszej tablicy z koszykami:

```csharp
Console.Write("Podaj liczbę koszyków, z których bedziesz losował:");
int x = int.Parse(Console.ReadLine());
Console.Write("Podaj liczbę drużyn w koszykach:");
int y = int.Parse(Console.ReadLine());
```

Następnie możemy stworzyć odpowiednią tablicę, według podanych informacji:

```csharp
string[,] koszyki = new string[x,y];
```

### Zadanie 1

Stwórz projek aplikacji konsolowej i dodaj do niej kod, który pobierze rozmiar tablicy z koszykami i drużynami w koszykach a następnie zainicjalizuj taką tablicę na podstawie podanych informacji.

## Implementacja - pobranie od użytkownika drużyn do koszyków

Musimy teraz uzupełnić informacje o zawartości koszyków. Użytkownik aby korzystać z naszego programu powinien ją znać. Nasza tablica z koszykami ma dwa wymiary:

1. Numer koszyka
2. Numer drużyny w koszyku

Możemy zatem stworzyć dwie pętle, pierwszą, która uzyska dostęp do całego koszyka:

```csharp
for(int i = 0; i < koszyki.GetLength(0); i++)
{
}
```

Możemy w niej wyświetlić informację, że pobieramy dane dla konkretnego koszyka, np.:

```csharp
Console.WriteLine("Podaj koszyk nr {0}:", i + 1);
```

Oprócz wyświetlenia informacji o koszyku powinniśmy wewnątrz powyższej pętli zaimplementować kolejną pętlę, która będzie odwoływała się do kolejnych miejsc dla drużyn w wybranym koszyku:

```csharp
for(int j=0; j < koszyki.GetLength(1); j++)
{
}
```

Wewnątrz drugiej pętli powinniśmy wyświetlić informacje o tym co chcemy uzyskać:

```csharp
Console.Write("Podaj drużynę {0}:", j + 1);
```

Zapytaliśmy o nazwę drużyny zatem należy ją pobrać od użytkownika i zapisać:

```csharp
koszyki[i,j] = Console.ReadLine();
```

### Zadanie 2

Dodaj do programu możliwość pobierania danych drużyn od użytkownika. Posugeruj się powyższym opisem.

## Implementacja - Tablica grup i losowanie

Obecnie nasz program wygląda następująco:

```csharp
Console.Write("Podaj liczbę koszyków, z których bedziesz losował:");
int x = int.Parse(Console.ReadLine());
Console.Write("Podaj liczbę drużyn w koszykach:");
int y = int.Parse(Console.ReadLine());

string[,] koszyki = new string[x,y];

for(int i = 0; i < koszyki.GetLength(0); i++)
{
  Console.WriteLine("Podaj koszyk nr {0}:", i + 1);
  for(int j=0; j < koszyki.GetLength(1); j++)
  {
    Console.Write("Podaj drużynę {0}:", j + 1);
    koszyki[i,j] = Console.ReadLine();
  }
}
```

Mamy już uzupełnione dane w naszych koszykach. Rozmiar grup jest odwrotny do rozmiaru koszyków. Jeśli użytkownik poda nam, że ma 3 koszyki po 2 drużyny to wynikiem losowania powinno być: 2 grupy po 3 drużyny.

Losujemy po jednej drużynie z każdego koszyka, a drużyn mamy dwie w każdym koszyku - aby wylosować wszystkie drużyny z każdego koszyka potrzeba nam 2 grup.

Jak już pewnie zauważyłeś wymiary tablicy z grupami są odwrotne do wymiaru tej z grupami. Zatem pod pętlami pobierającymi dane do koszyków od użytkownika możemy stworzyć tablicę z grupami:

```csharp
string[,] grupy = new string[koszyki.GetLength(1), koszyki.GetLength(0)];
```

Zauważ rozmiar nowej tablicy jest brany z wymiarów tablicy z koszykami. Najpierw bierzemy drugi wymiar tej tablicy, czyli liczbe drużyn w koszyku a następnie liczbę koszyków. W ten sposób uzyskamy adekwatną liczbę grup.

Teraz najważniejsza część, czyli losowanie. W tym celu musimy stworzyć sobie zeminną losującą:

```csharp
Random rnd = new Random();
```

I możemy przejść do porusza się w pętlach po tablicy z grupami - do niej zapisujemy w końcu nasze wyniki. Najpierw z grup wyciągamy pojedynczą grupę za pomocą poniższej pętli:

```csharp
for(int i = 0; i < grupy.GetLength(0); i++)
{

}
```

Wewnątrz tej pętli powinniśmy się poruszać po kolejnych drużynach w grupie. Kolejna drużyna oznacza dodatkowo numer koszyka z którego losujemy. W pętli powyżej wkładamy drugą pętlę:

```csharp
for(int j = 0; j < grupy.GetLength(1); j++)
{

}
```

Zatem zmienna `j` z drugiej pętli będzie pozwalała na odwołanie się do konkretnego koszyka (stad odwrotne rozmiary tablicy z grupami względem tej z koszykami).

Podczas analizy losowania założyliśmy, że możemy w danym koszyku w pewnym momencie działania algorytmu trafić na puste miejsce po wylosowanej drużynie w naszym koszyku. Zatem musimy losować drużynę w koszyku tak długo aż nazwa zapisana w danym miejscu jest nie pusta.

Na początku stwórzmy zmienną, która na chwilę przechowam nam wylosowaną z koszyka nazwę drużyny - dodajemy w środku drugiej pętli zmienną:

```csharp
string druzyna = "";
```

Musimy losować TAK DŁUGO aż WYLOSUJEMY JAKĄŚ DRUŻYNĘ - od razu na myśl przychodzi pętla `while`. Powinna ona wykonywać się tak długo jak nasza zmienna z nazwą drużyny (`druzyna`) jest pustym tekstem. Pod definicją wspomnianej zmiennej tworzymy pętle (tak to 3 poziom pętli - czasem tak trzeba ;) ):

```csharp
while(druzyna == "")
{

}
```

Obecnie mamy następujący kod:

```csharp
Console.Write("Podaj liczbę koszyków, z których bedziesz losował:");
int x = int.Parse(Console.ReadLine());
Console.Write("Podaj liczbę drużyn w koszykach:");
int y = int.Parse(Console.ReadLine());

string[,] koszyki = new string[x,y];

for(int i = 0; i < koszyki.GetLength(0); i++)
{
  Console.WriteLine("Podaj koszyk nr {0}:", i + 1);
  for(int j=0; j < koszyki.GetLength(1); j++)
  {
    Console.Write("Podaj drużynę {0}:", j + 1);
    koszyki[i,j] = Console.ReadLine();
  }
}

string[,] grupy = new string[koszyki.GetLength(1), koszyki.GetLength(0)];
Random rnd = new Random();
for(int i = 0; i < grupy.GetLength(0); i++)
{
  for(int j = 0; j < grupy.GetLength(1); j++)
  {
    string druzyna = "";
    while(druzyna == "")
    {

    }
  }
}
```

Wewnątrz pętli `while` powinniśmy przede wszystkim wylosować numer drużyny z koszyka. Losujemy indeks wewnątrz wybranego koszyka - numer koszyka mamy z pętli `for` - pod zmienną `j` (druga pętla for w tym fragmencie). Natomiast tutaj potrzebujemy liczbe drużyn w koszyku, zatem musimy pobrać drugi wymiar tablicy `koszyki`:

```csharp
int d = rnd.Next(0, koszyki.GetLength(1));
```

Ok, wylosowaliśmy jakąś drużynę z koszyka. Mamy numer koszyka: zmienna `j` oraz numer drużyny `d`. Możemy "wyjąć" tą drużynę z koszyka i zapisać do zmiennej `druzyna`:

```csharp
druzyna = koszyki[j, d];
```

Oprócz tego czyścimy miejsce po wybranej z koszyka drużynie:

```csharp
koszyki[j, y] = "";
```

Jeśli w danym wolosowanym miejscu będzie jakaś drużyna to zmienna `druzyna` nie będzie pusta i przerwie się pętla while. POZA PĘTLĄ `WHILE` możemy do naszej grupy wpisać wybraną drużynę w odpowiednie miejsce:

```csharp
grupy[i,j] = druzyna;
```

### Zadanie 3

Stwórz tablicę `grupy` o rozmiarze odwrotnym do rozmiaru tablicy `koszyki`. Następnie stwórz zmienną do losowania i dwie zagnieżdżone pętle FOR, któe pozwolą na poruszanie się po kolejnych grupach oraz pozwolą na zapisanie drużyn w danej grupie (i przy okazji wskażą kolejne koszyki do losowania).

Wewnątrz pętli omówionych powyżej dodaj zmienną `druzyna` i przypisz do niej pusty tekst. Następnie dodaj pętlę `while`, która będzie wykonywała się tak długo jak zmienna drużyna jest pustym tekstem `druzyna == ""`.

Wewnątrz pętli `while` wylosuj liczbę z zakresu od 0 do liczby drużyn w koszyku - jest to drugi wymiar tablicy `koszyki`. Wylosowaną liczbę zanotuj w zmiennej `d` (jak drużyna w koszyku). Na podstawie zmiennej `j`, którą jak mniemam dodałeś w drugiej pętli for, i wylosowanej zmiennej `d` wyciągnij z koszyka drużynę i zapisz jej nazwę do zmiennej `druzyna`. Na koniec pętli w aktualnie wybrane miejsce w danym koszyku wpisz pusty string `= "";`, tak aby wyczyścić wybraną drużynę z tego miejsca.

Poza pętlą while przypisz w aktualnym miejscu w tablicy `grupy` nową drużynę do grupy.

## Implementacja - zobaczmy co zostało wylosowane

Ostatnim krokiem jaki powinniśmy wykonać to przedstawienie wyników losowania.

Obecnie aplikacja powinna mieć poniższy kod:

```csharp
Console.Write("Podaj liczbę koszyków, z których bedziesz losował:");
int x = int.Parse(Console.ReadLine());
Console.Write("Podaj liczbę drużyn w koszykach:");
int y = int.Parse(Console.ReadLine());

string[,] koszyki = new string[x,y];

for(int i = 0; i < koszyki.GetLength(0); i++)
{
  Console.WriteLine("Podaj koszyk nr {0}:", i + 1);
  for(int j=0; j < koszyki.GetLength(1); j++)
  {
    Console.Write("Podaj drużynę {0}:", j + 1);
    koszyki[i,j] = Console.ReadLine();
  }
}

string[,] grupy = new string[koszyki.GetLength(1), koszyki.GetLength(0)];
Random rnd = new Random();
for(int i = 0; i < grupy.GetLength(0); i++)
{
  for(int j = 0; j < grupy.GetLength(1); j++)
  {
    string druzyna = "";
    while(druzyna == "")
    {
      int d = rnd.Next(0, koszyki.GetLength(1));
      druzyna = koszyki[j, d];
      koszyki[j, y] = "";
    }
    grupy[i,j] = druzyna;
  }
}
```

Na samym końcu dodaliśmy pętle. Pod pętlami dodamy jeszcze... dwie - chcemy wyświetlić naszą tablicę z grupami. Możemy skopiować dwie pętle które już mamy:

```csharp
for(int i = 0; i < grupy.GetLength(0); i++)
{
  for(int j = 0; j < grupy.GetLength(1); j++)
  {
  }
}
```

**UWAGA:** tak dodajemy jeszcze raz te same petle POD SPODEM!!!

Najpierw do pierwszej pętli, przed tą drugą dodajemy wyświetlenie numeru grupy:

```csharp
Console.WriteLine("Grupa {0}:", i + 1);
```

A następnie wewnątrz drugiej pętli wyświetlamy drużynę z danej grupy:

```csharp
Console.WriteLine("{0}. {1}", j + 1, grupy[i,j]);
```

### Zadanie 4

Dodaj na końcu programu wyświetlanie wylosowanych grup.

## Wyślij rozwiazania

Przygotuj kod źródłowy programu powstałego w trakcie realizacji ćwiczeń do wysyłki na podstawie [instrukcji](../ZdalneInstrukcja#wysyłanie-projektu-aplikacji-konsolowej)

Adres do wysyłki: [pawel.woloszyn@akademiamlodychprogramistow.pl](mailto:pawel.woloszyn@akademiamlodychprogramistow.pl)

Temat Maila: `Poprawka - test - tablice`
