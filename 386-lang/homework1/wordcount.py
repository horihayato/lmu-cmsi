import fileinput, string

#function partially from: http://stackoverflow.com/questions/1342000/how-to-make-the-python-interpreter-correctly-handle-non-ascii-characters-in-stri
def removeNonAscii(s): 
	s = s.translate(None, string.punctuation)
	return "".join(i for i in s if ord(i)<128)

story = ""
f = fileinput.input()

# Construct single string out of story
# Lowercase, remove non-ascii chars, returns & punctuation
for line in f:
	line = line.lower()
	line = removeNonAscii(line)
	story += line[:-1] + " "

#parse story by spaces, alphabetize & sort unique words
story = sorted(story.split())
unique = set(story)
unique = sorted(unique)

#print occurances of individual words
for s in unique:
	print s + " " + str(story.count(s))