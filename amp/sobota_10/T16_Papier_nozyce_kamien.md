# Papier nożyce kamień

Docelowo aplikacjia powinna:

1. Wyświetlać menu
2. Pytać użytkownika o jego wybraną figurę
3. Losować figurę wybraną przez komputer
4. Zliczać kolejno punkty dla użytkownika i komputera
5. Wracać do menu
6. Jeśli użytkownik wybierze w menu opcję `Wyjście` aplikacja powinna przerwać swoje działanie.

Aktualna wersja kodu:
```csharp
enum Wybor 
{
	Koniec,
	Kamien,
	Papier,
	Nozyce
}

enum Zwyciezca
{
	Komputer,
	Gracz,
	Remis
}

public static void Main(string[] args)
{
	Console.WriteLine("Papier nożyce kamień!");
	PokazMenuWyboru();
	int wyborGraczaInt = int.Parse(Console.ReadLine());
	Wybor wyborGracza = Mapuj(wyborGraczaInt);
	Random rnd = new Random();
	Wybor wyborKomputera = Mapuj(rnd.Next(1,4));
	PokazWybor(wyborGracza, "Gracz");
	PokazWybor(wyborKomputera, "Komputer");
	Zwyciezca wygrany = SprawdzWygranego(wyborGracza, wyborKomputera);
	switch(wygrany)
	{
		case Zwyciezca.Gracz:
			Console.WriteLine("Wygrał Gracz!");
			break;
		case Zwyciezca.Komputer:
			Console.WriteLine("Wygrał Komputer!");
			break;
		default:
			Console.WriteLine("Remis!");
			break;
	}
	Console.ReadKey(true);
}

static Zwyciezca SprawdzWygranego(Wybor gracz, Wybor komputer)
{
	if(gracz == Wybor.Kamien && komputer == Wybor.Papier
		|| gracz == Wybor.Papier && komputer == Wybor.Nozyce
		|| gracz == Wybor.Nozyce && komputer == Wybor.Kamien)
	{
		return Zwyciezca.Komputer;
	}
	if(gracz == Wybor.Kamien && komputer == Wybor.Nozyce
		|| gracz == Wybor.Papier && komputer == Wybor.Kamien
		|| gracz == Wybor.Nozyce && komputer == Wybor.Papier)
	{
		return Zwyciezca.Gracz;
	}
	return Zwyciezca.Remis;
}

static void PokazWybor(Wybor wybrana, string kto)
{
	Console.WriteLine("{0} wybrał: {1}", kto, wybrana);
}

static Wybor Mapuj(int wartosc)
{
	switch(wartosc)
	{
		case 0:
			return Wybor.Koniec;
		case 1:
			return Wybor.Kamien;
		case 2:
			return Wybor.Papier;
		case 3:
			return Wybor.Nozyce;
		default:
			return Wybor.Koniec;
	}
}

static void PokazMenuWyboru()
{
	Console.WriteLine("Czym grasz?");
	Console.WriteLine("1 - kamień");
	Console.WriteLine("2 - papier");
	Console.WriteLine("3 - nożyce");
	Console.WriteLine("0 - koniec gry");
	Console.Write("Wybierasz: ");
}
```