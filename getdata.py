import urllib2
from bs4 import BeautifulSoup
from sets import Set


departments = Set([
'AAS','AERO',
'AEROSP','ALA',
'AMCULT','ANATOMY''ANTHRARC'	'ANTHRBIO'	,'ANTHRCUL'	,'AOSS','APPPHYS','ARABAM',
'ARABIC','ARCH','ARMENIAN','ARTDES','ASIAN','ASIANLAN','ASIANPAM','ASTRO','AUTO','BA','BCS','BIOINF','BIOLCHEM','BIOLOGY','BIOMEDE','BIOPHYS','BIOSTAT','CEE','CHE','CHEM','CLARCH','CLCIV','CLIMATE','CMPLXSYS','COGSCI','COMM','COMP','COMPLIT','CSP','CZECH','DANCE','DUTCH','EARTH','ECON','EDCURINS','EDUC','EEB','EECS','EHS','ELI','ENGLISH','ENGR','ENS','ENSCEN','ENVIRON','ES','ESENG','FRENCH','GEOG','GERMAN','GREEK','GREEKMOD','GTBOOKS','HEBREW','HF','HISTART','HISTORY','HONORS','INSTHUM','INTLSTD','INTMED','IOE','ENG:','ITALIAN','JAZZ','JUDAIC','KINESLGY','LACS','LATIN','LATINOAM','LHSP','LING','MACROMOL','MATH','MATSCIE','MCDB','MECHENG','MEDCHEM','MEDPREP','MEMS','MENAS','MFG','MICRBIOL','MILSCI','MKT','BA:','MOVESCI','MUSEUMS','MUSICOL','MUSMETH','MUSTHTRE','NATIVEAM','NAVARCH','NAVSCI','NEAREAST','NERS','NESLANG','NEUROL','NEUROSCI','NRE','NURS','ORGSTUDY','PAT','PATH','PERSIAN','PHARMACY','PHARMSCI','PHIL','PHRMACOL','PHYSICS','PHYSIOL','POLISH','POLSCI','PORTUG','PPE','PSYCH','PUBHLTH','PUBPOL','RCARTS','RCASL','RCCORE','RCHUMS','RCIDIV','RCLANG','RCNSCI','RCSSCI','REEES','RELIGION','ROMLANG','ROMLING','RUSSIAN','SAC','SCAND','SEAS','SI','SLAVIC','SOC','SPACE','SPANISH','STATS','STDABRD','STRATEGY','SW','TCHNCLCM','THEORY','THTREMUS','TO','TURKISH','UARTS','UC','UKR','UP','WOMENSTD','WRITING','YIDDISH'])


businessDepartments = {'Business Administration':'BA',
'Management & Organizations':'MO',
'Technology & Operations':'TO'
}
engineeringDepartments = {
	
	'Aerospace Engineering':'AEROSP',
'Atmos, Oceanic & Space Sci':'AOSS',
'Automotive Engineering Program':'AUTO',
'Biomedical Engineering':'BIOMEDE',
'Chemical Engineering':'CHE',
'Civil & Environmental Engin':'CEE',
'Climate & Meteorology':'CLIMATE',
'Elec Engin & Computer Sci':'EECS',
'Engineering':'ENGR',
'Environmental Sciences & Engin':'ENSCEN',
'Industrial & Operations Engin':'IOE',
'Manufacturing':'MFG',
'Materials Science Engineering':'MATSCIE',
'Mechanical Engineering':'MECHENG',
'Naval Arch & Marine Engin':'NAVARCH',
'Nuclear Engin & Radiolog Sci':'NERS',
'Space Science & Engineering':'SPACE',
'Technical Communication':'TCHNCLCM'
}
lsaDepartments = {'Afroamerican & African Studies':'AAS',
'American Culture':'AMCULT',
'Anthropological Archaeology':'ANTHRARC',
'Anthropology,Biological':'ANTHRBIO',
'Anthropology,Cultural':'ANTHRCUL',
'Applied Liberal Arts':'ALA',
'Applied Physics':'APPPHYS',
'Arab American Studies':'ARABAM',
'Arabic Studies':'ARABIC',
'Armenian Studies':'ARMENIAN',
'Asian Languages':'ASIANLAN',
'Asian Studies':'ASIAN',
'Asian/Pacific Island Amer Std':'ASIANPAM',
'Astronomy':'ASTRO',
'Biology':'BIOLOGY',
'Biophysics':'BIOPHYS',
'Bosnian/Croatian/Serbian':'BCS',
'Buddhist Studies':'BUDDHST',
'Chemistry':'CHEM',
'Chinese Studies':'CCS',
'Classical Archaeology':'CLARCH',
'Classical Civilization':'CLCIV',
'Classical Linguistics':'CLLING',
'College Honors':'HONORS',
'Communication Studies':'COMM',
'Comparative Literature':'COMPLIT',
'Complex Systems':'CMPLXSYS',
'Comprehensive Studies Program':'CSP',
'Czech':'CZECH',
'Dutch':'DUTCH',
'Earth & Environmental Sciences':'EARTH',
'Ecology & Evolutionary Biology':'EEB',
'Economics':'ECON',
'English Lang & Literature':'ENGLISH',
'English Language Institute':'ELI',
'Environment':'ENVIRON',
'European Studies':'EURO',
'French':'FRENCH',
'Geography':'GEOG',
'German':'GERMAN',
'Great Books':'GTBOOKS',
'Greek':'GREEK',
'Hebrew Studies':'HEBREW',
'History':'HISTORY',
'History of Art':'HISTART',
'Institute For The Humanities':'INSTHUM',
'International Studies':'INTLSTD',
'Islamic Studies':'ISLAM',
'Italian':'ITALIAN',
'Japanese Studies':'CJS',
'Judaic Studies':'JUDAIC',
'Korean Studies':'KRSTD',
'Latin':'LATIN',
'Latin Amer & Caribbean Stu':'LACS',
'Latina/o American Studies':'LATINOAM',
'Linguistics':'LING',
'Lloyd Hall Scholars Program':'LHSP',
'Macromolecular Science':'MACROMOL',
'Mathematics':'MATH',
'Medieval & Early Modern Std':'MEMS',
'Middle Eastern & N African Stu':'MENAS',
'Modern Greek':'GREEKMOD',
'Molec, Cell & Develop Biology':'MCDB',
'Museum Methods':'MUSMETH',
'Museums':'MUSEUMS',
'Native American Studies':'NATIVEAM',
'Near East Studies':'NEAREAST',
'Near East Studies Languages':'NESLANG',
'Organizational Studies':'ORGSTUDY',
'Persian':'PERSIAN',
'Philos, Politics & Economics':'PPE',
'Philosophy':'PHIL',
'Physics':'PHYSICS',
'Polish':'POLISH',
'Political Science':'POLSCI',
'Portuguese':'PORTUG',
'Psychology':'PSYCH',
'RC American Sign Language':'RCASL',
'RC Core Courses':'RCCORE',
'RC Fine Arts':'RCARTS',
'RC Humanities':'RCHUMS',
'RC Interdivisional':'RCIDIV',
'RC Languages':'RCLANG',
'RC Natural Sciences':'RCNSCI',
'RC Social Sciences':'RCSSCI',
'Religion':'RELIGION',
'Romance Languages&Literatures':'ROMLANG',
'Romance Linguistics':'ROMLING',
'Russian':'RUSSIAN',
'Russian, E Europe & Euras Stu':'REEES',
'Scandinavian':'SCAND',
'Screen Arts & Cultures':'SAC',
'Slavic':'SLAVIC',
'Sociology':'SOC',
'South Asian Studies':'SAS',
'Southeast Asian Studies':'SEAS',
'Spanish':'SPANISH',
'Statistics':'STATS',
'Study Abroad':'STDABRD',
'Survey Methodology':'SURVMETH',
'Sweetland Center for Writing':'WRITING',
'Turkish Studies':'TURKISH',
'Ukrainian':'UKR',
'University Courses':'UC',
'Womens Studies':'WOMENSTD',
'Yiddish':'YIDDISH'}
medicalDepartments = {'Anatomy':'ANATOMY',
'Bioinformatics':'BIOINF',
'Biological Chemistry':'BIOLCHEM',
'Biomedical Sciences':'PIBS',
'Cell and Developmental Biology':'CDB',
'Cellular And Molecular Biology':'CMBIOL',
'Human Genetics':'HUMGEN',
'Immunology':'IMMUNO',
'Internal Medicine':'INTMED',
'Microbiology':'MICRBIOL',
'Neuroscience':'NEUROSCI',
'Pathology':'PATH',
'Pharmacology':'PHRMACOL',
'Physical Medicine & Rehab':'PMR',
'Physiology':'PHYSIOL'}

musicalDepartments = {'Arts Administration':'ARTSADMN',
'Composition':'COMP',
'Dance':'DANCE',
'Ensemble':'ENS',
'Jazz & Improvisational Studies':'JAZZ',
'Music Performance':'MUSPERF',
'Musical Theatre':'MUSTHTRE',
'Musicology':'MUSICOL',
'Performing Arts & Technology':'PAT',
'Theatre & Drama':'THTREMUS',
'Theory':'THEORY'}

educationDepartments = {'Educ C Behavior Sci In Educ':'EDBEHAVR',
'Education':'EDUC',
'Education D Curriculum & Instr':'EDCURINS'}



seenCourses = dict()

base = "https://www.lsa.umich.edu/cg/"
oldSearch = "https://www.lsa.umich.edu/cg/cg_results.aspx?termArray=w_17_2120&cgtype=ug&show=20&department="
firstSearch = "https://www.lsa.umich.edu/cg/cg_results.aspx?termArray=w_17_2120&cgtype=ug&show=20&department="
done = False
for key, value in lsaDepartments.items():
	print "Department = " + key
	firstSearch += value
	i = 0
	while done == False:
		departmentPage = urllib2.urlopen(firstSearch)
		departmentSoup = BeautifulSoup(departmentPage,"html.parser")
		links = departmentSoup.findAll('div',{'class': "ClassHyperlink"});
		for link in links:
			coursePage = urllib2.urlopen(base + link['data-url']);
			courseSoup = BeautifulSoup(coursePage,"html.parser");
			if i == 0:
				print courseSoup
				i = 1



print firstSearch
	
thisPage = urllib2.urlopen(firstSearch)
thisSoup = BeautifulSoup(thisPage,"html.parser")
	#print thisSoup
homePage = urllib2.urlopen(firstSearch) #Get first page of search results for couses in the EECS department 
soup = BeautifulSoup(homePage, "html.parser")
links = soup.find('select', {'id': 'contentMain_lbSubject'})
childrenLinks = links.findChildren()




	




	





#print soup.prettify()

