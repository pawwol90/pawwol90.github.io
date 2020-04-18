# Temat 20.5 - Test z tablic jednowymiarowych

---

# Test
Wykonaj [test](http://bit.ly/AkademiaMP_P1T4)

# Zadanie praktyczne 

Pobierz opis zadania w formie [PDF](T20_5_Materiały.pdf).

Stwórz projekt aplikacji konsolowej, następnie zaznacz w nim funkcję `Main` i zastą ją poniższym kodem:

```csharp
public static void Main(string[] args)
{
    //TUTAJ NIC NIE ZMIENIAJ!!
	int ileOsob = ZapytajOInt("Ile osób chcesz podać");
	string[] osoby = PobierzOsoby(ileOsob);
	int ileWylosowac = ZapytajOInt("Ile mam wylosować osób z podanej grupy");
	WylosujOsoby(osoby, ileWylosowac);
	Console.ReadKey(true);
}
		
static int ZapytajOInt(string pytanie)
{
    // Funkcja powinna wyświetlić parametr `pytanie` na ekranie oraz pobrać od użytkownika liczbę i zwrócić.
}
				
static string ZapytajOString(string pytanie)
{
    // Funkcja powinna wyświetlić parametr `pytanie` na ekranie oraz pobrać od użytkownika tekst i go zwrócić.
}

static string[] PobierzOsoby(int ileOsob)
{
    // Funkcja dostaje parametr z liczbą osób do pobrania od użytkownika (parametr: ileOsob). W tej funkcji stwórz tablicę o zadanym rozmiarze, następnie w pętli FOR uzupełnij dane w tablicy i zwróć uzupełnioną tablicę jako wynik działania funkcji
}

static void WylosujOsoby(string[] osoby, int ileOsobWylosowac)
{
	// Funkcja otrzymuje dwie informacje: tablica z uzupełnioną listą osób, oraz informacje o tym ile osób powinna wylosować. Najpierw stwórz obiekt do losowania, a następnie wykonaj w pętli losowanie tyle razy ile osób należy wylosować. Musisz wylosować konkretny numer w tablicy więc losowanie powinno odbyć się od 0 do rozmiaru tablicy (np. osoby.Lengt).
}
```

# Wyślij rozwiazania

Przygotuj kod źródłowy programu do wysyłki na podstawie [instrukcji](../ZdalneInstrukcja#wysyłanie-projektu-aplikacji-konsolowej)

Adres do wysyłki: [pawel.woloszyn@akademiamlodychprogramistow.pl](mailto:pawel.woloszyn@akademiamlodychprogramistow.pl)

Temat Maila: `Tablice - test`