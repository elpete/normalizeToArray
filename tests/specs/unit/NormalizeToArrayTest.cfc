component extends="testbox.system.BaseSpec" {
    function beforeAll() {
        include "/root/functions/normalizeToArray.cfm";
    }

    function run() {
        describe( "normalizeToArray", function() {
            it( "returns an array unmodified", function() {
                var actual = normalizeToArray( [ 1, 2, 3, 4 ] );

                expect( actual ).toBe( [ 1, 2, 3, 4 ] );
            } );

            it( "converts a list to an array", function() {
                var actual = normalizeToArray( "1,2,3,4" );

                expect( actual ).toBe( [ 1, 2, 3, 4 ] );
            } );

            it( "converts an empty string to an array", function() {
                var actual = normalizeToArray( "" );

                expect( actual ).toBe( [ "" ] );
            } );

            it( "converts variadic parameters to an array", function() {
                var actual = normalizeToArray( 1, 2, 3, 4 );

                expect( actual ).toBe( [ 1, 2, 3, 4 ] );
            } );

            it( "converts a query to an array of structs", function() {
                var query = queryNew( "id,name,age", "", [
                    { id = 1, name = "John", age = 28 },
                    { id = 1, name = "Jane", age = 32 },
                    { id = 1, name = "Joe", age = 44 }
                ] );

                var actual = normalizeToArray( query );

                expect( actual ).toBe( [
                    { id = 1, name = "John", age = 28 },
                    { id = 1, name = "Jane", age = 32 },
                    { id = 1, name = "Joe", age = 44 }
                ] );
            } );

            it( "converts a struct to an array of (one) struct", function() {
                var struct = { id = 1, name = "John", age = 28 };
                var actual = normalizeToArray( struct );

                expect( actual ).toBe( [ { id = 1, name = "John", age = 28 } ] );
            } );
        } );
    }
}