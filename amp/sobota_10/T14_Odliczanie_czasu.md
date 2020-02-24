# Odliczanie czasu

Kolejne zajęcia utrwalające wiedzę z pętli FOR:

```csharp
public static void Main(string[] args)
{
	Console.WriteLine("Odliczanie sekund");
	var liczbaSekund = PobierzLiczbeSekund();
	Odliczaj(liczbaSekund);
	Console.ReadKey(true);
}

static void Odliczaj(int liczbaSekund)
{
	Console.WriteLine("Start!");
	for(var i = liczbaSekund; i > 0; i--)
	{
		Console.Write("\r{0:00}",i);
		Thread.Sleep(1000);
	}
	Console.WriteLine("\nKoniec!");
	Console.Beep(440, 1000);
}

static int PobierzLiczbeSekund()
{
	int liczbaSekund;
	Console.Write("Podaj czas odliczania:");
	while(!int.TryParse(Console.ReadLine(), out liczbaSekund))
	{
		Console.Write("To nie jest cyfra, podaj czas odliczania:");
	}
	
	return liczbaSekund;
}
```